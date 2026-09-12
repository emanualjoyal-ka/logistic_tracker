import type { Request, Response } from "express";
import { calculateDistanceKm } from "../../utils/haversine.js";
import { TrafficCondition, WeatherCondition } from "../../generated/prisma/enums.js";
import { calculateDeliveryPrice } from "./pricing.service.js";
import { sendResponse } from "../../utils/ApiResponse.js";


export const getPricingQuote=(req: Request,res: Response)=> {
    const input=req.body;
    const distanceKm =calculateDistanceKm(
        input.pickupLatitude,
        input.pickupLongitude,
        input.dropoffLatitude,
        input.dropoffLongitude
      );
    // For now, conditions are simulated.Later these could come from external traffic/weather services.
    const trafficCondition =TrafficCondition.MEDIUM;
    const weatherCondition =WeatherCondition.CLEAR;
    const pricing = calculateDeliveryPrice(distanceKm,trafficCondition,weatherCondition);
    return sendResponse(res,{
        statusCode:200,
        data:{
        distanceKm:Number(distanceKm.toFixed(2)),
        ...pricing,
        }
    })
}