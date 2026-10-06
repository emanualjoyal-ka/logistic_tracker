import { api } from "@/lib/api";
import { API_ENDPOINTS } from "./endpoints/endpoints";
import { AdminDashboard, AdminOrder, AdminPartner } from "@/types/admin";

export const fetchOrdersDashboard=async(): Promise<AdminDashboard>=> {
  const response = await api.get(API_ENDPOINTS.admin.GET_DASHBOARD_ORDERS);
  console.log("dashboard...",response.data);
  return response.data.data;
}

export const fetchCustomerOrders=async(): Promise<AdminOrder[]>=>  {
  const response =await api.get(API_ENDPOINTS.admin.GET_CUSTOMER_ORDERS);
  console.log("Orders.....",response.data);
  return response.data.data.data;
}

export const fetchCustomerOrder=async(orderId: string)=> {
  const response =await api.get(API_ENDPOINTS.admin.GET_CUSTOMER_ORDER(orderId));
  console.log("Orders.....",response.data.data);
  return response.data.data;
}

export const fetchPartners=async(): Promise<AdminPartner[]> => {
  const response =await api.get(API_ENDPOINTS.admin.GET_ALL_PARTNERS);
  console.log("partners.....",response.data);
  return response.data.data.data;
}

export const fetchAvailablePartners=async()=> {
  const response = await api.get(API_ENDPOINTS.admin.GET_AVAILABLE_PARTNER);
  return response.data.data;
}

export const AssignOrder=async (orderId:string,deliveryPartnerId:string) => {
  const response =await api.post(API_ENDPOINTS.admin.ASSIGN_ORDER(orderId),{deliveryPartnerId});
  console.log("assign response.....",response.data);
  return response.data.data;
}