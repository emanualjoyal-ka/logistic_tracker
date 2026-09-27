import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import { api } from "@/lib/api";
import {Order} from "@/types/order";

const fetchOrders=async(): Promise<Order[]>=> {
  const response = await api.get("/orders");
  console.log("Orders.....",response);
  return response.data.data.data;
}

export const useOrders=()=> {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
}

async function fetchOrder(orderId: string): Promise<Order> {
  const response =await api.get(`/orders/${orderId}`);
  console.log("Orders.....",response.data.data);
  return response.data.data;
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: [
      "orders",
      orderId,
    ],
    queryFn: () => fetchOrder(orderId),
    enabled: Boolean(orderId)
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: async (orderId: string) => {
      const response = await api.post(`/orders/${orderId}/cancel`);
      return response.data.data;
    },
    onSuccess: (_data,orderId) => {
      queryClient.invalidateQueries({queryKey: ["orders"]});
      queryClient.invalidateQueries({queryKey: ["orders",orderId]});
    }
  });
}