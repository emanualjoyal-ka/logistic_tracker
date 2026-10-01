import { OrderStatus, UserRole } from "../../generated/prisma/enums.js";
import prisma from "../../lib/prisma.js"

const partnerTable=prisma.deliveryPartnerProfile;
const orderTable=prisma.order;
const userTable=prisma.user;

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

    getAdminDashboard:async()=>{
      const [
        totalOrders,
        pendingOrders,
        activeOrders,
        deliveredOrders,
        totalPartners,
        availablePartners
      ] = await Promise.all([
        orderTable.count(),
        orderTable.count({
          where: {status: OrderStatus.PENDING}
        }),
        orderTable.count({
          where: {
            status: {
              in: [
                OrderStatus.ASSIGNED,
                OrderStatus.ACCEPTED,
                OrderStatus.PICKED_UP,
                OrderStatus.IN_TRANSIT
              ]
            }
          }
        }),
        orderTable.count({
          where: {status: OrderStatus.DELIVERED}
        }),
        userTable.count({
          where: {role: UserRole.DELIVERY_PARTNER}
        }),
        partnerTable.count({
          where: {isAvailable: true}
        })
      ]);
      return {
        totalOrders,
        pendingOrders,
        activeOrders,
        deliveredOrders,
        totalPartners,
        availablePartners
      }
    },

    getAdminOrders:async(page:number,limit:number)=>{
      const skip=(page-1)*limit;
      const [orders,totalItems]=await Promise.all([
        orderTable.findMany({
        skip,
        take:limit,
        orderBy: {createdAt: "desc"},
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
          customer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          assignments: {
            where: {completedAt: null},
            orderBy: {assignedAt: "desc"},
            take: 1,
            select: {
              id: true,
              deliveryPartner: {
                select: {
                  id: true,
                  user: {
                    select: {name: true}
                  },
                  vehicleType: true,
                  vehicleNumber: true,
                }
              }
            }
          }
        }
        }),
        orderTable.count()
      ])
      return {orders,totalItems}
    },

    getAdminOrder:(orderId:string)=>{
      return orderTable.findUnique({
        where: {id: orderId},
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
          customer: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          assignments: {
            orderBy: {assignedAt: "desc"},
            select: {
              id: true,
              assignedAt: true,
              acceptedAt: true,
              completedAt: true,
              deliveryPartner: {
                select: {
                  id: true,
                  vehicleType: true,
                  vehicleNumber: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true
                    }
                  }
                }
              }
            }
          },
          pricingQuote: {
            select: {
              baseFee: true,
              distanceFee: true,
              trafficCondition: true,
              trafficMultiplier: true,
              weatherCondition: true,
              weatherMultiplier: true,
              totalFee: true,
            }
          }
        }
      });
    },

    getAllPartner:async(page:number,limit:number)=>{
      const skip=(page-1)*limit;
      const [partners,totalItems]=await Promise.all([
        partnerTable.findMany({
          skip,
          take:limit,
          orderBy: {createdAt: "desc"},
          select: {
            id: true,
            vehicleType: true,
            vehicleNumber: true,
            isAvailable: true,
            currentLatitude: true,
            currentLongitude: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            },
            _count: {
              select: {assignments: true}
            }
          }
        }),
        partnerTable.count()
      ])
      return {partners,totalItems}
    }






}