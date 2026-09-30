import { api } from "@/lib/api";
import { API_ENDPOINTS } from "./endpoints/endpoints";
import { Order } from "@/types/order";

export const fetchOrders=async(): Promise<Order[]>=> {
  const response = await api.get(API_ENDPOINTS.orders.GET_ORDERS);
  console.log("Orders.....",response);
  return response.data.data.data;
}

export const fetchOrder=async(orderId: string): Promise<Order>=> {
  const response =await api.get(API_ENDPOINTS.orders.GET_ORDER(orderId));
  console.log("Orders.....",response.data.data);
  return response.data.data;
}

export const cancelOrder=async(orderId:string)=>{
  const response = await api.post(API_ENDPOINTS.orders.CANCEL_ORDER(orderId));
  console.log("Orders.....",response.data.data);
  return response.data.data;
}