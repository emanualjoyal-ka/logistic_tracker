import axios, { AxiosError, InternalAxiosRequestConfig }  from "axios";
import { store } from "@/store/store";
import { API_ENDPOINTS } from "@/api/endpoints/endpoints";
import { logout, setAccessToken } from "@/features/auth/authSlice";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

const refreshAccessToken = async (): Promise<string> => {
  const response = await refreshClient.post(API_ENDPOINTS.auth.REFRESH_TOKEN);
  const newToken = response.data.accessToken;
  store.dispatch(setAccessToken(newToken));
  return newToken;
};

api.interceptors.response.use((response) => response,async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {_retry?: boolean;};
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes(API_ENDPOINTS.auth.REFRESH_TOKEN) ||
      originalRequest.url?.includes(API_ENDPOINTS.auth.ME)
    ) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;
    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }
      const newToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      store.dispatch(logout());
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(refreshError);
    }
  }
);