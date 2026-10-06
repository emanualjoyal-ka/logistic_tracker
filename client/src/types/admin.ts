import { OrderStatus } from "@/types/order";

export interface AdminDashboard {
  totalOrders: number;
  pendingOrders: number;
  activeOrders: number;
  deliveredOrders: number;
  totalPartners: number;
  availablePartners: number;
}

export interface AdminPartner {
  id: string;

  vehicleType:
    | "BIKE"
    | "SCOOTER"
    | "CAR"
    | "VAN";

  vehicleNumber: string;

  isAvailable: boolean;

  currentLatitude: number | null;
  currentLongitude: number | null;

  user: {
    id: string;
    name: string;
    email: string;
  };

  _count: {
    assignments: number;
  };
}

export interface AdminOrder {
  id: string;
  orderNumber: string;

  pickupAddress: string;
  dropoffAddress: string;

  distanceKm: number;

  status: OrderStatus;

  deliveryFee: string;

  createdAt: string;
  updatedAt: string;

  customer: {
    id: string;
    name: string;
    email: string;
  };

  assignments: {
    id: string;

    deliveryPartner: {
      id: string;

      vehicleType:
        | "BIKE"
        | "SCOOTER"
        | "CAR"
        | "VAN";

      vehicleNumber: string;

      user: {
        name: string;
      };
    };
  }[];
}