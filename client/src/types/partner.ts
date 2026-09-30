import { OrderStatus } from "@/types/order";

/*
 * Information about the delivery partner.
 */
export interface PartnerProfile {
  id: string;
  userId: string;
  vehicleType:
    | "BIKE"
    | "SCOOTER"
    | "CAR"
    | "VAN";

  vehicleNumber: string;

  isAvailable: boolean;

  currentLatitude: number | null;
  currentLongitude: number | null;
}

/*
 * Delivery assigned to the partner.
 */
export interface PartnerOrder {
  id: string;
  orderNumber: string;

  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;

  dropoffAddress: string;
  dropoffLatitude: number;
  dropoffLongitude: number;

  distanceKm: number;

  status: OrderStatus;

  deliveryFee: string;

  createdAt: string;
  updatedAt: string;
}

export interface LocationInput {
  latitude: number;
  longitude: number;
}

export interface PartnerOrdersResponse {
  data: PartnerOrder[];

  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
