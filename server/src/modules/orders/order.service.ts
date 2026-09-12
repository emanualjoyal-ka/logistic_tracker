import { OrderStatus, Prisma, TrafficCondition, WeatherCondition } from "../../generated/prisma/client.js";
import ApiError from "../../utils/ApiError.js";
import { calculateDistanceKm } from "../../utils/haversine.js";
import { generateOrderNumber } from "../../utils/order-number.js";
import { canCancelOrder } from "../../utils/order-status.js";
import { calculateDeliveryPrice } from "../pricing/pricing.service.js";
import { orderRepository } from "./order.repository.js";
import type { AllOrdersResponse, CancelDetailsResponse, CreateOrderInput, CustomerOrderDetails, OrderResponse } from "./order.types.js";

export const orderServices={
    createOrder: async(customerId: string,input: CreateOrderInput):Promise<OrderResponse>=> {
        if (!customerId) {
            throw new ApiError("User not found",403);
        }
        const distanceKm = calculateDistanceKm(
            input.pickupLatitude,
            input.pickupLongitude,
            input.dropoffLatitude,
            input.dropoffLongitude
        );

        // Round distance to 2 decimal places.
        const roundedDistance = Math.round(distanceKm * 100) / 100;

        const trafficCondition =TrafficCondition.MEDIUM;
        const weatherCondition =WeatherCondition.CLEAR;
        const pricing =calculateDeliveryPrice(
            roundedDistance,
            trafficCondition,
            weatherCondition
        );

        //Generate human-readable order number.
        const orderNumber = generateOrderNumber();
        const locations={
            pickupAddress:input.pickupAddress,
            pickupLatitude: input.pickupLatitude,
            pickupLongitude: input.pickupLongitude,
            dropoffAddress: input.dropoffAddress,
            dropoffLatitude: input.dropoffLatitude,
            dropoffLongitude: input.dropoffLongitude,
        }
        const order= await orderRepository.createOrder(orderNumber,customerId,pricing,roundedDistance,locations)
        return order;
    },

    getCustomerOrders:async(customerId: string,page:number,limit:number):Promise<AllOrdersResponse>=> {
        if(!customerId){
            throw new ApiError("Unauthorized",409)
        }
        const {orders,totalItems}=await orderRepository.getCustomerOrders(customerId,page,limit)
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

    getCustomerOrder:async(customerId: string,orderId: unknown):Promise<CustomerOrderDetails>=> {
        if(!customerId){
            throw new ApiError("Unauthorized",401)
        }
        if (typeof orderId !== "string" || !orderId) {
            throw new ApiError("Invalid order ID", 400);
        }
        const order=await orderRepository.getCustomerOrder(orderId,customerId);
        if(!order){
            throw new ApiError("Order not found",404)
        }
        return order;
    },

    cancelCustomerOrder:async(customerId: string,orderId: unknown):Promise<CancelDetailsResponse>=> {
        if(!customerId){
            throw new ApiError("Unauthorized",401)
        }
        if (typeof orderId !== "string" || !orderId) {
            throw new ApiError("Invalid order ID", 400);
        }
        const order = await orderRepository.getCustomerOrder(orderId,customerId);
        if (!order) {
            throw new ApiError("Order not found",404);
        }
        if (!canCancelOrder(order.status)) {
            throw new ApiError(`Order cannot be cancelled when status is ${order.status}`,400);
        }
        const data=await orderRepository.changeStatus(order.id,OrderStatus.CANCELLED)
        return data;
    },





}

