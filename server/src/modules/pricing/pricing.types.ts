import { z } from "zod";
import type { pricingQuoteSchema } from "./pricing.validation.js";
import type { TrafficCondition, WeatherCondition } from "../../generated/prisma/enums.js";
import type { Prisma } from "../../generated/prisma/client.js";


export type PricingQuoteInput =z.infer<typeof pricingQuoteSchema>;


export interface PricingResult {
  baseFee: string;
  distanceFee: string;
  trafficCondition: TrafficCondition;
  trafficMultiplier: string;
  weatherCondition: WeatherCondition;
  weatherMultiplier: string;
  totalFee: string;
}


