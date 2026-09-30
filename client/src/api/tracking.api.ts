import { CurrentTracking } from "@/hooks/use-tracking";
import { api } from "@/lib/api";
import { API_ENDPOINTS } from "./endpoints/endpoints";

export const fetchCurrentTracking=async(orderId: string): Promise<CurrentTracking>=> {
  const response =await api.get(API_ENDPOINTS.tracking.GET_CURRENT_TRACKING(orderId));
  return response.data.data;
}