import { useQuery } from "@tanstack/react-query";
import { fetchCurrentTracking } from "@/api/tracking.api";

export interface CurrentTracking {
  orderId: string;
  status: string;
  partner: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}


export function useCurrentTracking(orderId: string) {
  return useQuery({
    queryKey: ["tracking",orderId,"current"],
    queryFn: () =>fetchCurrentTracking(orderId),
    enabled: Boolean(orderId)
  });
}