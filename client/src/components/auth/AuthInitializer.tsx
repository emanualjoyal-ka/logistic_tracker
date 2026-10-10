"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hook/hooks";
import {setCredentials,setAuthChecked, setAccessToken} from "@/features/auth/authSlice";
import { API_ENDPOINTS } from "@/api/endpoints/endpoints";
import { api, refreshClient } from "@/lib/api";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const refreshResponse = await refreshClient.post(API_ENDPOINTS.auth.REFRESH_TOKEN);
        const accessToken = refreshResponse.data.data.accessToken;
        dispatch(setAccessToken(accessToken));
        const meResponse = await api.get(API_ENDPOINTS.auth.ME);
        const user = meResponse.data.data;
        dispatch(
          setCredentials({
            user,
            accessToken,
          })
        );
      } catch {
        dispatch(setAuthChecked());
      }
    };
    initializeAuth();
  }, [dispatch]);
  return null;
}
