export type OrderStatus =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
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