import type { OrderStatus, Prisma } from "../../generated/prisma/client.js";
import prisma from "../../lib/prisma.js"
import type { PricingResult } from "../pricing/pricing.types.js";
import type { OrderLocations } from "./order.types.js";

const orderTable=prisma.order;

export const orderRepository={
    createOrder:async(orderNumber:string,customerId:string,pricing:PricingResult,roundedDistance:number,locations:OrderLocations)=>{
        return prisma.$transaction(async(tx)=>{
            const order=await tx.order.create({
                data: {
                    orderNumber,
                    customerId,
                
                    pickupAddress: locations.pickupAddress,
                    pickupLatitude: locations.pickupLatitude,
                    pickupLongitude: locations.pickupLongitude,

                    dropoffAddress: locations.dropoffAddress,
                    dropoffLatitude: locations.dropoffLatitude,
                    dropoffLongitude: locations.dropoffLongitude,

                    distanceKm: roundedDistance,
                    status: "PENDING",
                    deliveryFee:pricing.totalFee,
                },
                select: {
                    id: true,
                    orderNumber: true,
                    pickupAddress: true,
                    dropoffAddress: true,
                    distanceKm: true,
                    status: true,
                    deliveryFee: true,
                    createdAt: true,
                    updatedAt: true,
                }
            });

            await tx.pricingQuote.create({
                data: {
                    orderId: order.id,
                    baseFee:pricing.baseFee,
                    distanceFee:pricing.distanceFee,
                    trafficCondition:pricing.trafficCondition,
                    trafficMultiplier:pricing.trafficMultiplier,
                    weatherCondition:pricing.weatherCondition,
                    weatherMultiplier:pricing.weatherMultiplier,
                    totalFee:pricing.totalFee,
                }
            });
            return order;
        })
    },

    getCustomerOrders:async(customerId:string,page:number,limit:number)=>{
        const skip=(page-1)*limit;
        const [orders,totalItems]=await Promise.all([
            orderTable.findMany({
                skip,
                take:limit,
                where: {
                    customerId
                },
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    id: true,
                    orderNumber: true,
                    pickupAddress: true,
                    dropoffAddress: true,
                    distanceKm: true,
                    status: true,
                    deliveryFee: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            orderTable.count({
                where:{
                    customerId
                }
            })
        ])
        return {orders,totalItems}
    },

    getCustomerOrder:(orderId:string,customerId:string)=>{
        return orderTable.findFirst({
            where: {
                id: orderId,
                customerId,
            },
            select: {
                id: true,
                orderNumber: true,
                pickupAddress: true,
                pickupLatitude: true,
                pickupLongitude: true,
                dropoffAddress: true,
                dropoffLatitude: true,
                dropoffLongitude: true,
                distanceKm: true,
                status: true,
                deliveryFee: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    },

    changeStatus:(orderId:string,status:OrderStatus)=>{
        return orderTable.update({
            where: {
                id: orderId,
            },
            data: {
                status,
            },      
            select: {
                id: true,
                orderNumber: true,
                status: true,
                updatedAt: true,
            }
        });
    }
}