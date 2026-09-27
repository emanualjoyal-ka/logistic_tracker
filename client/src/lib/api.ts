import axios from "axios";
import { getAccessToken } from "./authTest";

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL

export const api = axios.create({
  baseURL:BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config)=>{
    const token=getAccessToken();
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})