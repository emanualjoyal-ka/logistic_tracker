import { adminRepository } from "./admin.repository.js";
import type { AllAvailablePartnersResponse, assignmentResponse } from "./admin.types.js";
import ApiError from "../../utils/ApiError.js";
import { OrderStatus } from "../../generated/prisma/enums.js";


export const adminServices={
    getAvailablePartners:async(page:number,limit:number):Promise<AllAvailablePartnersResponse>=> {
        const {partners,totalItems}=await adminRepository.getAvailablePartners(page,limit);
        if(!partners){
          throw new ApiError("No available partners",404)
        }
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data:partners,
            pagination:{
                page,
                limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        };
    },

    assignOrderToPartner:async(orderId: unknown,partnerProfileId: string):Promise<assignmentResponse>=> {
      if(!partnerProfileId){
        throw new ApiError("partnerProfileId is required",400)
      }
      if (typeof orderId !== "string" || !orderId) {
            throw new ApiError("Invalid order ID", 400);
      }
      const order = await adminRepository.findOrder(orderId);
      if (!order) {
        throw new ApiError("Order not found",404);
      }
      if (order.status !== OrderStatus.PENDING) {
        throw new ApiError(`Order cannot be assigned when status is ${order.status}`,409);
      }
      const partner = await adminRepository.findPartner(partnerProfileId);
      if (!partner) {
        throw new ApiError("Delivery partner not found",404);
      }
      if (!partner.isAvailable) {
        throw new ApiError("Delivery partner is not available",409);
      }
      const response=await adminRepository.assignorder(order.id,partner.id);
      return response;
    },





}



