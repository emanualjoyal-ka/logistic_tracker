import { api } from "@/lib/api";
import { LocationInput, PartnerOrder, PartnerOrdersResponse, PartnerProfile } from "@/types/partner";
import { API_ENDPOINTS } from "./endpoints/endpoints";

export const fetchPartnerProfile=async(): Promise<PartnerProfile>=> {
  const response = await api.get(API_ENDPOINTS.partner.GET_PROFILE);
  return response.data.data;
}

export const fetchPartnerOrders=async(): Promise<PartnerOrdersResponse>=> {
  const response = await api.get(API_ENDPOINTS.partner.GET_ORDERS);
  return response.data.data;
}

export const fetchPartnerOrder=async(orderId: string): Promise<PartnerOrder>=> {
  const response = await api.get(API_ENDPOINTS.partner.GET_ORDER(orderId));
  console.log(response.data.data);
  return response.data.data;
}

export const acceptDelivery=async(orderId:string)=>{
  const response = await api.post(API_ENDPOINTS.partner.ACCEPT_DELIVERY(orderId));
  return response.data.data;
}

export const pickUpDelivery=async(orderId:string)=>{
  const response = await api.post(API_ENDPOINTS.partner.PICKUP_ORDER(orderId));
  return response.data.data;
}

export const startDelivery=async(orderId:string)=>{
  const response =await api.post(API_ENDPOINTS.partner.START_DELIVERY(orderId));
  return response.data.data;
}

export const orderDelivered=async(orderId:string)=>{
  const response = await api.post(API_ENDPOINTS.partner.ORDER_DELIVERED(orderId));
  return response.data.data;
}

export const updatePartnerLocation=async(location:LocationInput)=>{
  const response = await api.patch("/tracking/location",location);
  return response.data.data;
}