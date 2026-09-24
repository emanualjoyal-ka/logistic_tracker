import { z } from "zod";
import type { updateLocationSchema } from "./tracking.validation.js";


export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;


export type TrackingHistoryResponse={
    id: string
    orderId:string;
    deliveryPartnerId:string;
    latitude:number;
    longitude:number;
    recordedAt: Date;
}

export type UpdatedLocationResponse={
    id: string;
    currentLatitude: number | null;
    currentLongitude: number | null;
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

export type CustomerTrackHistoryResponse={
    id: string;
    latitude: number;
    longitude: number;
    recordedAt: Date;
}

export type TrackHistoryResponse= {
  data:CustomerTrackHistoryResponse[];
  pagination:PaginationDTO;
}



