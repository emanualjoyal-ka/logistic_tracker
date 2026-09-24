import { OrderStatus } from "../../generated/prisma/enums.js";
import ApiError from "../../utils/ApiError.js";
import { trackingRepository } from "./tracking.repository.js";
import type { CustomerTrackHistoryResponse, TrackHistoryResponse, TrackingHistoryResponse, UpdatedLocationResponse, UpdateLocationInput } from "./tracking.types.js";


export const trackingServices={
  updatePartnerLocation:async(userId: string,input: UpdateLocationInput):Promise<UpdatedLocationResponse>=> {
    const partner = await trackingRepository.getPartnerProfile(userId);
    if (!partner) {
      throw new ApiError("Delivery partner profile not found",404);
    }
    const updatedPartner = await trackingRepository.updateCurrentLocation(partner.id,input.latitude,input.longitude);
    return updatedPartner;
  },

  recordTrackingPoint:async(orderId: unknown,userId: string,latitude: number,longitude: number):Promise<TrackingHistoryResponse>=> {
    if (typeof orderId !== "string" || !orderId) {
      throw new ApiError("Invalid order ID", 400);
    }
    const partner = await trackingRepository.getPartnerProfile(userId);
    if (!partner) {
      throw new ApiError("Delivery partner profile not found",404);
    }
    const assignment = await trackingRepository.findOrderAssignment(orderId,partner.id);
    if (!assignment) {
      throw new ApiError("Order not found or not assigned to you",404);
    }
    const allowedStatuses:OrderStatus[] = [
      OrderStatus.ACCEPTED,
      OrderStatus.PICKED_UP,
      OrderStatus.IN_TRANSIT,
    ];
    if (!allowedStatuses.includes(assignment.order.status)) {
      throw new ApiError(`Cannot record tracking when order status is ${assignment.order.status}`,409);
    }
    const trackingPoint =await trackingRepository.createTrackingHistory(orderId,partner.id,latitude,longitude)
    return trackingPoint;
  },

  getOrderTrackingHistory:async(customerId: string,orderId: unknown,page:number,limit:number):Promise<TrackHistoryResponse>=> {
    if(!customerId){
      throw new ApiError("Unauthorized",409)
    }
    if(typeof orderId !== "string" || !orderId) {
      throw new ApiError("Invalid order ID", 400);
    }
    const order = await trackingRepository.getCustomerOrders(orderId,customerId);
    if (!order) {
      throw new ApiError("Order not found",404);
    }
    const {result,totalItems}=await trackingRepository.getTrackingHistory(orderId,page,limit);
    const totalPages = Math.ceil(totalItems / limit);
    return {
        data:result,
        pagination:{
            page,
            limit,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        }
    };
  }



}



