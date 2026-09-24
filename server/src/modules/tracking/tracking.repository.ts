import prisma from "../../lib/prisma.js"
import { getIO } from "../../lib/socket.js";

const partnerTable=prisma.deliveryPartnerProfile;
const orderAssignment=prisma.orderAssignment;
const trackingPoint=prisma.trackingPoint;
const orderTable=prisma.order;

export const trackingRepository={
    getPartnerProfile:(userId:string)=>{
        return partnerTable.findUnique({
            where: {
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });
    },

    updateCurrentLocation:(partnerId:string,latitude:number,longitude:number)=>{
        return partnerTable.update({
            where: {
                id: partnerId
            },
            data: {
                currentLatitude:latitude,
                currentLongitude:longitude
            },
            select: {
                id: true,
                currentLatitude: true,
                currentLongitude: true,
                updatedAt: true
            }
        });
    },

    findOrderAssignment:(orderId:string,partnerId:string)=>{
        return orderAssignment.findFirst({
            where: {
                orderId,
                deliveryPartnerId:partnerId
            },
            include: {
                order: true
            }
        });
    },

    createTrackingHistory:(orderId:string,partnerId:string,latitude:number,longitude:number)=>{
        return prisma.$transaction(async (tx) => {
            const trackingPoint = await tx.trackingPoint.create({
                data: {
                    orderId,
                    deliveryPartnerId:partnerId,
                    latitude,
                    longitude
                },
                select: {
                    id: true,
                    orderId:true,
                    deliveryPartnerId:true,
                    latitude:true,
                    longitude:true,
                    recordedAt: true
                }
            });

            await tx.deliveryPartnerProfile.update({
                where: {
                    id: partnerId
                },
                data: {
                    currentLatitude: latitude,
                    currentLongitude: longitude
                }
            });

            const io = getIO();
            io.to(`order:${orderId}`).emit("tracking_update",{
                orderId,
                latitude,
                longitude,
                recordedAt: new Date()
            });
            return trackingPoint;
        });
    },

    findOrderAssignmentForSimulation:(orderId:string)=>{
        return orderAssignment.findFirst({
            where: {
                orderId
            },
            include: {
                order: true,
                deliveryPartner: true,
            },
        });
    },

    getCustomerOrders:(orderId:string,customerId:string)=>{
        return orderTable.findFirst({
            where: {
                id: orderId,
                customerId,
            }
        });
    },

    getTrackingHistory:async(orderId:string,page:number,limit:number)=>{
        const skip=(page-1)*limit;
        const [result,totalItems]=await Promise.all([
            trackingPoint.findMany({
                skip,
                take:limit,
                where: {
                    orderId
                },
                select: {
                    id: true,
                    latitude: true,
                    longitude: true,
                    recordedAt: true
                },
                orderBy: {
                    recordedAt: "desc"
                }
            }),
            trackingPoint.count({
                where:{
                    orderId
                }
            })
        ])
        return {result,totalItems}
    },

    findOrder:(orderId:string,userId:string)=>{
        return orderTable.findFirst({
            where: {
                id: orderId,
                customerId: userId,
            },
            select: {
                id: true,
                status: true,
            }
        });
    }
    





}