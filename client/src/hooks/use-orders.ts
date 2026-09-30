import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import { cancelOrder, fetchOrder, fetchOrders } from "@/api/order.api";

export const useOrders=()=> {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ["orders",orderId],
    queryFn: () => fetchOrder(orderId),
    enabled: Boolean(orderId)
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn:(orderId: string) => cancelOrder(orderId),
    onSuccess: (_data,orderId) => {
      queryClient.invalidateQueries({queryKey: ["orders"]});
      queryClient.invalidateQueries({queryKey: ["orders",orderId]});
    }
  });
}