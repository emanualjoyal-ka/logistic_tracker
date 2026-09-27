import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface CurrentTracking {
  orderId: string;
  status: string;

  partner: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}

async function fetchCurrentTracking(orderId: string): Promise<CurrentTracking> {
  const response =await api.get(`/tracking/orders/${orderId}/current`);
  return response.data.data;
}

export function useCurrentTracking(orderId: string) {
  return useQuery({
    queryKey: ["tracking",orderId,"current"],
    queryFn: () =>fetchCurrentTracking(orderId),
    enabled: Boolean(orderId)
  });
}