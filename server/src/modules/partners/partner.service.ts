import { partnerRepository } from "./partner.repository.js";
import ApiError from "../../utils/ApiError.js";
import { getAssignedOrder } from "./partner.helper.js";
import { canTransitionOrderStatus } from "../../utils/order-status.js";
import { OrderStatus } from "../../generated/prisma/enums.js";
import type { OrderAssignmentResponse } from "./partner.types.js";
import { startTrackingSimulation, stopTrackingSimulation } from "../tracking/tracking.simulator.js";
import type { AllOrdersResponse, CustomerOrderDetails } from "../orders/order.types.js";


export const partnerServices={
    acceptOrder:async(userId: string,orderId: unknown):Promise<OrderAssignmentResponse>=> {
        if (typeof orderId !== "string" || !orderId) {
            throw new ApiError("Invalid order ID", 400);
        }
        const {assignment,order} = await getAssignedOrder(userId,orderId);
        if (!canTransitionOrderStatus(order.status,OrderStatus.ACCEPTED)) {
            throw new ApiError(`Order cannot be accepted when status is ${order.status}`,409);
        }
        const response=await partnerRepository.assignOrder(order.id,assignment.id);
        return response;
    },

    pickupOrder:async(userId: string,orderId: unknown):Promise<OrderAssignmentResponse>=> {
        if (typeof orderId !== "string" || !orderId) {
            throw new ApiError("Invalid order ID", 400);
        }
        const {order} = await getAssignedOrder(userId,orderId);
        if (!canTransitionOrderStatus(order.status,OrderStatus.PICKED_UP)){
          throw new ApiError(`Order cannot be picked up when status is ${order.status}`,409);
        }
        const response=await partnerRepository.statustoPickup(order.id);
        return response;
    },

    startDelivery:async(userId: string,orderId: unknown):Promise<OrderAssignmentResponse>=> {
        if (typeof orderId !== "string" || !orderId) {
            throw new ApiError("Invalid order ID", 400);
        }
        const {order} = await getAssignedOrder(userId,orderId);
        if (!canTransitionOrderStatus(order.status,OrderStatus.IN_TRANSIT)) {
          throw new ApiError(`Delivery cannot start when status is ${order.status}`,409);
        }
        const response=await partnerRepository.statustoTransit(order.id);
        await startTrackingSimulation(order.id);
        return response;
    },

    deliverOrder:async(userId: string,orderId: unknown):Promise<OrderAssignmentResponse>=> {
        if (typeof orderId !== "string" || !orderId) {
            throw new ApiError("Invalid order ID", 400);
        }
        const {assignment,order} = await getAssignedOrder(userId,orderId);
        if (!canTransitionOrderStatus(order.status,OrderStatus.DELIVERED)){
          throw new ApiError(`Order cannot be delivered when status is ${order.status}`,409);
        }
        const response=await partnerRepository.statustoDelivered(order.id,assignment.id,assignment.deliveryPartnerId);
        stopTrackingSimulation(order.id);
        return response;
      },

      partnerProfile:async(partnerId:string)=>{
        const user=await partnerRepository.getProfile(partnerId);
        if(!user){
            throw new ApiError("user not found",404)
        }
        return {
            vehicleType:user.vehicleType,
            vehicleNumber:user.vehicleNumber,
            isAvailable:user.isAvailable
        }
      },

      getAssignedOrders:async(partnerId: string,page:number,limit:number):Promise<AllOrdersResponse>=> {
        if(!partnerId){
            throw new ApiError("Unauthorized",409)
        }
        const {orders,totalItems}=await partnerRepository.getAssignedOrders(partnerId,page,limit)
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data:orders,
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

    getAssignedOrder:async(partnerId: string,orderId: unknown):Promise<CustomerOrderDetails>=> {
        if(!partnerId){
            throw new ApiError("Unauthorized",401)
        }
        if (typeof orderId !== "string" || !orderId) {
            throw new ApiError("Invalid order ID", 400);
        }
        const order=await partnerRepository.getAssignedOrder(orderId,partnerId);
        if(!order){
            throw new ApiError("Order not found",404)
        }
        return order;
    },


}





