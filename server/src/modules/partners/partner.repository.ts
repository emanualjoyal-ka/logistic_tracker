import { OrderStatus } from "../../generated/prisma/enums.js";
import prisma from "../../lib/prisma.js"


const partnerTable=prisma.deliveryPartnerProfile;
const orderAssignment=prisma.orderAssignment;
const orderTable=prisma.order;

export const partnerRepository={
    getPartnerProfile:(userId:string)=>{
        return partnerTable.findUnique({
            where: {
                userId,
            }
        });
    },

    getOrderAssignment:(orderId:string,partnerId:string)=>{
        return orderAssignment.findFirst({
            where: {
                orderId,
                deliveryPartnerId:partnerId,
            },
            include: {
                order: true,
            },
        });
    },

    assignOrder:(orderId:string,assignmentId:string)=>{
        return prisma.$transaction(
            async (tx) => {
                const updatedOrder =await tx.order.update({
                    where: {
                        id: orderId,
                    },
                    data: {
                        status:OrderStatus.ACCEPTED,
                    },
                    select: {
                        id: true,
                        orderNumber: true,
                        status: true,
                        updatedAt: true,
                    },
                });

                await tx.orderAssignment.update({
                    where: {
                        id: assignmentId,
                    },
                    data: {
                        acceptedAt: new Date(),
                    },
                });
                return updatedOrder;
            }
        );
    },

    statustoPickup:(orderId:string)=>{
        return orderTable.update({
          where: {
            id: orderId,
          },
          data: {
            status:OrderStatus.PICKED_UP,
          },
          select: {
            id: true,
            orderNumber: true,
            status: true,
            updatedAt: true,
          },
        });
    },

    statustoTransit:(orderId:string)=>{
        return orderTable.update({
          where: {
            id: orderId,
          },
          data: {
            status:OrderStatus.IN_TRANSIT,
          },
          select: {
            id: true,
            orderNumber: true,
            status: true,
            updatedAt: true,
          },
        });
    },

    statustoDelivered:(orderId:string,assignmentId:string,deliveryPartnerId:string)=>{
        return prisma.$transaction(
            async (tx) => {
                const updatedOrder =await tx.order.update({
                    where: {
                        id: orderId,
                    },
                    data: {
                        status:OrderStatus.DELIVERED,
                    },
                    select: {
                        id: true,
                        orderNumber: true,
                        status: true,
                        updatedAt: true,
                    },
                });

                await tx.orderAssignment.update({
                    where: {
                        id: assignmentId,
                    },
                    data: {
                        completedAt: new Date(),
                    }
                });

                await tx.deliveryPartnerProfile.update({
                    where: {
                        id: deliveryPartnerId,
                    },
                    data: {
                        isAvailable: true,
                    }
                });
                return updatedOrder;
          }
        );
    },
}