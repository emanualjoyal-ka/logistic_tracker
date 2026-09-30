import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query";
import { acceptDelivery, fetchPartnerOrder, fetchPartnerOrders, fetchPartnerProfile, orderDelivered, pickUpDelivery, startDelivery } from "@/api/partner.api";

export function usePartnerProfile() {
  return useQuery({
    queryKey: ["partner", "profile"],
    queryFn: fetchPartnerProfile
  });
}

export function usePartnerOrders() {
  return useQuery({
    queryKey: ["partner", "orders"],
    queryFn: fetchPartnerOrders,
    refetchInterval: 15000
  });
}

export function usePartnerOrder(orderId: string) {
  return useQuery({
    queryKey: ["partner","orders",orderId],
    queryFn: () =>fetchPartnerOrder(orderId),
    enabled: Boolean(orderId)
  });
}

export function useAcceptOrder() {
  const queryClient = useQueryClient();
  return useMutation({mutationFn:(orderId: string) => acceptDelivery(orderId),
    onSuccess: (_data,orderId) => {
      queryClient.invalidateQueries({queryKey: ["partner", "orders"]});
      queryClient.invalidateQueries({queryKey: ["partner","orders",orderId]});
    }
  });
}

export function usePickupOrder() {
  const queryClient = useQueryClient();
  return useMutation({mutationFn:(orderId: string) => pickUpDelivery(orderId),
    onSuccess: (_data,orderId) => {
      queryClient.invalidateQueries({queryKey: ["partner", "orders"],});
      queryClient.invalidateQueries({queryKey: ["partner","orders",orderId]});
    }
  });
}

export function useStartOrder() {
  const queryClient = useQueryClient();
  return useMutation({mutationFn:(orderId: string) => startDelivery(orderId),
    onSuccess: (_data,orderId) => {
      queryClient.invalidateQueries({queryKey: ["partner", "orders"]});
      queryClient.invalidateQueries({queryKey: ["partner","orders",orderId]});
    }
  });
}

export function useDeliverOrder() {
  const queryClient = useQueryClient();
  return useMutation({mutationFn:(orderId: string) => orderDelivered(orderId),
    onSuccess: (_data,orderId) => {
      queryClient.invalidateQueries({queryKey: ["partner", "orders"]});
      queryClient.invalidateQueries({queryKey: ["partner","orders",orderId]});
    }
  });
}