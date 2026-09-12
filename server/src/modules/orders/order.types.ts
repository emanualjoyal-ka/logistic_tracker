import { z } from "zod";
import { createOrderSchema } from "./order.validation.js";
import type { Prisma } from "../../generated/prisma/client.js";

export type CreateOrderInput = z.infer<typeof createOrderSchema>;



export type OrderLocations = {
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  dropoffAddress: string;
  dropoffLatitude: number;
  dropoffLongitude: number;
};


export type OrderResponse = {
  id: string;
  orderNumber: string;
  distanceKm: number;
  pickupAddress: string;
  dropoffAddress: string;
  status: Prisma.OrderGetPayload<{select: { status: true }}>["status"];
  deliveryFee: Prisma.Decimal;
  createdAt: Date;
  updatedAt: Date;
};


export type CustomerOrders= {
    id: string;
    orderNumber: string
    pickupAddress: string;
    dropoffAddress: string;
    distanceKm: number;
    status: Prisma.OrderGetPayload<{select: { status: true }}>["status"];
    deliveryFee: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date;
}

export type PaginationDTO = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type AllOrdersResponse= {
  data:CustomerOrders[];
  pagination:PaginationDTO;
}


export type CustomerOrderDetails = {
  id: string;
  orderNumber: string;

  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;

  dropoffAddress: string;
  dropoffLatitude: number;
  dropoffLongitude: number;

  distanceKm: number;
  status: Prisma.OrderGetPayload<{select: { status: true }}>["status"];
  deliveryFee: Prisma.Decimal;

  createdAt: Date;
  updatedAt: Date;
};

export type CancelDetailsResponse={
  id:string;
  orderNumber:string;
  status:Prisma.OrderGetPayload<{select: { status: true }}>["status"];
  updatedAt:Date;
}