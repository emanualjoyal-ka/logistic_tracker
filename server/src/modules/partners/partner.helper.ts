import ApiError from "../../utils/ApiError.js";
import { partnerRepository } from "./partner.repository.js";


export const getAssignedOrder=async(userId: string,orderId: string)=> {
    const partner = await partnerRepository.getPartnerProfile(userId);
    if (!partner) {
        throw new ApiError("Delivery partner profile not found",404);
    }
    const assignment = await partnerRepository.getOrderAssignment(orderId,partner.id);
    if (!assignment) {
        throw new ApiError("Order not found or not assigned to you",404);
    }
    return {
        partner,
        assignment,
        order: assignment.order,
    };
}