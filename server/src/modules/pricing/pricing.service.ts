import { Prisma, TrafficCondition, WeatherCondition } from "../../generated/prisma/client.js";
import type { PricingResult } from "./pricing.types.js";

// Fixed charge for every delivery.
const BASE_FEE = new Prisma.Decimal("40.00");

// Price charged for every kilometer.
const PRICE_PER_KM = new Prisma.Decimal("10.00");

const TRAFFIC_MULTIPLIERS: Record<TrafficCondition,Prisma.Decimal> = {
  [TrafficCondition.LOW]: new Prisma.Decimal("1.00"),
  [TrafficCondition.MEDIUM]: new Prisma.Decimal("1.15"),
  [TrafficCondition.HIGH]: new Prisma.Decimal("1.30"),
};

const WEATHER_MULTIPLIERS: Record<WeatherCondition,Prisma.Decimal> = {
  [WeatherCondition.CLEAR]: new Prisma.Decimal("1.00"),
  [WeatherCondition.RAIN]: new Prisma.Decimal("1.10"),
  [WeatherCondition.HEAVY_RAIN]: new Prisma.Decimal("1.25"),
};


export const calculateDeliveryPrice=(distanceKm: number,trafficCondition: TrafficCondition,weatherCondition: WeatherCondition): PricingResult=> {
  const distance = new Prisma.Decimal(distanceKm.toFixed(2));

  //Distance fee: distance × price per kilometer   
  const distanceFee = distance.times(PRICE_PER_KM);

  //Base price + distance price.
  const subtotal = BASE_FEE.plus(distanceFee);
  const trafficMultiplier = TRAFFIC_MULTIPLIERS[trafficCondition];
  const weatherMultiplier = WEATHER_MULTIPLIERS[weatherCondition];

  const trafficAdjustedPrice = subtotal.times(trafficMultiplier);
  const finalFee = trafficAdjustedPrice.times(weatherMultiplier);
  const roundedFinalFee =finalFee.toDecimalPlaces(2);

  return {
    baseFee:BASE_FEE.toFixed(2),
    distanceFee:distanceFee.toDecimalPlaces(2).toFixed(2),
    trafficCondition,
    trafficMultiplier:trafficMultiplier.toFixed(2),
    weatherCondition,
    weatherMultiplier:weatherMultiplier.toFixed(2),
    totalFee:roundedFinalFee.toFixed(2),
  };
}