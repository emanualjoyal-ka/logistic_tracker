import type { Prisma } from "../../generated/prisma/client.js";
import type { VehicleType } from "../../generated/prisma/enums.js";

type PaginationDTO = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type AvailablePartner = {
    id: string;
    vehicleType: VehicleType;
    vehicleNumber: string;
    currentLatitude: number | null;
    currentLongitude: number | null;
    user: {
        id: string;
        name: string;
        email: string;
    };
};

export type AllAvailablePartnersResponse= {
  data:AvailablePartner[];
  pagination:PaginationDTO;
}

export type assignmentResponse={
  order:{
    id: string;
    orderNumber: string;
    status: Prisma.OrderGetPayload<{select: { status: true }}>["status"];
    updatedAt: Date;
  },
  assignment:{
    id: string;
    orderId: string;
    deliveryPartnerId: string;
    assignedAt: Date;
  }
}