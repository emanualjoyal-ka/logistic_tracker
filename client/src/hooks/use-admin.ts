import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query";
import { AssignOrder, fetchAvailablePartners, fetchCustomerOrder, fetchCustomerOrders, fetchOrdersDashboard, fetchPartners } from "@/api/admin.api";


export function useAdminDashboard() {
  return useQuery({
    queryKey: ["admin","dashboard"],
    queryFn:fetchOrdersDashboard,
    refetchInterval: 15000
  });
}

export function useAdminOrders() {
  return useQuery({
    queryKey: ["admin","orders"],
    queryFn:fetchCustomerOrders
  });
}

export function useAdminOrder(orderId: string) {
  return useQuery({
    queryKey: ["orders",orderId],
    queryFn: () => fetchCustomerOrder(orderId),
    enabled: Boolean(orderId)
  });
}

export function useAdminPartners() {
  return useQuery({
    queryKey: ["admin","partners"],
    queryFn: fetchPartners
  });
}

export function useAvailablePartners() {
  return useQuery({
    queryKey: ["admin","partners","available"],
    queryFn: fetchAvailablePartners
  });
}

export function useAssignOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({orderId,deliveryPartnerId}: {orderId: string;deliveryPartnerId: string;})=>AssignOrder(orderId,deliveryPartnerId),
    onSuccess: (_data,variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin","orders"]
      });
      queryClient.invalidateQueries({
        queryKey: ["admin","partners"]
      });
      queryClient.invalidateQueries({
        queryKey: ["admin","partners","available"]
      });
      queryClient.invalidateQueries({
        queryKey: ["admin","dashboard"]
      });
    }
  });
}