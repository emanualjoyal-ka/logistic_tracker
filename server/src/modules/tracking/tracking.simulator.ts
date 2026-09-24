
import { OrderStatus } from "../../generated/prisma/enums.js";
import ApiError from "../../utils/ApiError.js";
import { calculateDistanceKm } from "../../utils/haversine.js";
import { moveToward } from "../../utils/move-toward.js";
import { trackingRepository } from "./tracking.repository.js";


// Live location is simulated using a server-side movement engine; no real GPS data is used.
const activeSimulations = new Map<string, NodeJS.Timeout>();

export const startTrackingSimulation=async(orderId: string)=> {
  if (activeSimulations.has(orderId)) {
    return;
  }
  const assignment = await trackingRepository.findOrderAssignmentForSimulation(orderId)
  if (!assignment) {
    throw new ApiError("Order assignment not found",404);
  }
  const partner = assignment.deliveryPartner;
  if (partner.currentLatitude === null || partner.currentLongitude === null) {
    throw new ApiError("Delivery partner location is not available",404);
  }
  const timer = setInterval(async () => {
        try {
          await movePartner(orderId);
        } catch (error) {
          console.error("Tracking simulation error:",error);
          stopTrackingSimulation(orderId);
        }
      },
      5000
  );
  activeSimulations.set(orderId,timer);
}


export const stopTrackingSimulation=(orderId: string)=> {
  const timer = activeSimulations.get(orderId);
  if (!timer) {
    return;
  }
  clearInterval(timer);
  activeSimulations.delete(orderId);
}


const movePartner=async(orderId: string)=> {
  const assignment = await trackingRepository.findOrderAssignmentForSimulation(orderId) 
  if (!assignment) {
    stopTrackingSimulation(orderId);
    return;
  }
  if (assignment.order.status !== OrderStatus.IN_TRANSIT) {
    stopTrackingSimulation(orderId);
    return;
  }
  const partner = assignment.deliveryPartner;
  if (partner.currentLatitude === null || partner.currentLongitude === null) {
    stopTrackingSimulation(orderId);
    return;
  }
  const current = {
    latitude: partner.currentLatitude,
    longitude: partner.currentLongitude,
  };
  const destination = {
    latitude: assignment.order.dropoffLatitude,
    longitude: assignment.order.dropoffLongitude,
  };
  const remainingDistance = calculateDistanceKm(
      current.latitude,
      current.longitude,
      destination.latitude,
      destination.longitude
  );
  if (remainingDistance < 0.05) {
    console.log(`Partner reached destination for order ${orderId}`);
    stopTrackingSimulation(orderId);
    return;
  }
  const next =moveToward(current,destination,0.1);
  await trackingRepository.createTrackingHistory(orderId,partner.id,next.latitude,next.longitude)
  console.log(`Order ${orderId}:`,next);
}