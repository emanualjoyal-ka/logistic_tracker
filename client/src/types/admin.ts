import { OrderStatus } from "@/types/order";

type VehicleType= "BIKE"| "SCOOTER"| "CAR"| "VAN";

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
  vehicleType:VehicleType
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
      vehicleType:VehicleType;
      vehicleNumber: string;
      user: {
        name: string;
      };
    };
  }[];
}


export interface AvailablePartner {
 id:string;
 vehicleType:VehicleType;
 vehicleNumber: string;
 currentLatitude: number;
 currentLongitude: number;
 user: {
  id: string;
  name: string;
  email: string;
 }[]
 }


 export interface Partner {
  id: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  currentLatitude: number;
  currentLongitude: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AvailablePartnersResponse {
  data: Partner[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}