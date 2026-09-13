import { OrderStatus } from "../../generated/prisma/enums.js";
import prisma from "../../lib/prisma.js"
const partnerTable=prisma.deliveryPartnerProfile;
const orderTable=prisma.order;

export const adminRepository={
    getAvailablePartners:async(page:number,limit:number)=>{
        const skip=(page-1)*limit;
        const [partners,totalItems]=await Promise.all([
            partnerTable.findMany({
                skip,
                take:limit,
                where: {
                    isAvailable: true,
                },        
                select: {
                    id: true,        
                    vehicleType: true,
                    vehicleNumber: true,
                    currentLatitude: true,
                    currentLongitude: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "asc",
                }
            }),
            partnerTable.count({
                where:{
                    isAvailable:true
                }
            })
        ])
        return {partners,totalItems};
    },

    findOrder:(orderId:string)=>{
        return orderTable.findUnique({
          where: {
            id: orderId
          }
        });
    },

    findPartner:(partnerProfileId:string)=>{
        return partnerTable.findUnique({
          where: {
            id: partnerProfileId
          }
        });
    },

    assignorder:(orderId:string,partnerId:string)=>{
        return prisma.$transaction(async (tx) => {
          const assignment = await tx.orderAssignment.create({
              data: {
                orderId: orderId,
                deliveryPartnerId:partnerId
              },
              select: {
                id: true,
                orderId: true,
                deliveryPartnerId: true,
                assignedAt: true,
              }
          });

          const updatedOrder = await tx.order.update({
              where: {
                id: orderId,
              },
              data: {
                status: OrderStatus.ASSIGNED,
              },
              select: {
                id: true,
                orderNumber: true,
                status: true,
                updatedAt: true,
              }
          });

          await tx.deliveryPartnerProfile.update({
            where: {
              id: partnerId,
            },
            data: {
              isAvailable: false,
            },
          });
          return {
            order: updatedOrder,
            assignment
          };
        });
    },








}