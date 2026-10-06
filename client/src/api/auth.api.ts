import { api } from "@/lib/api";
import { API_ENDPOINTS } from "./endpoints/endpoints";
import { AuthUser, Login, LoginResponse, Signup } from "@/types/auth";

export const registerUser=async(data:Signup):Promise<AuthUser>=>{
    const response=await api.post(API_ENDPOINTS.auth.REGISTER,data);
    return response.data.data;
}   

export const loginUser=async(data:Login):Promise<LoginResponse>=>{
    const response=await api.post(API_ENDPOINTS.auth.LOGIN,data);
    return response.data.data;
}
   