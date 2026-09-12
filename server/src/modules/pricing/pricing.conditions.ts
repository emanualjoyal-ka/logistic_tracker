import { TrafficCondition, WeatherCondition } from "../../generated/prisma/enums.js";

/*
 For now traffic and weather are simulated. Later we could replace these functions with
 - real traffic API
 - weather API
 - internal logistics service
*/
export const getSimulatedTraffic=():TrafficCondition=> {
  const conditions = [
    TrafficCondition.LOW,
    TrafficCondition.MEDIUM,
    TrafficCondition.HIGH,
  ];
  const index = Math.floor(Math.random() * conditions.length);
  return conditions[index]!;
}

export const getSimulatedWeather=():WeatherCondition=> {
  const conditions = [
    WeatherCondition.CLEAR,
    WeatherCondition.RAIN,
    WeatherCondition.HEAVY_RAIN,
  ];
  const index = Math.floor(Math.random() * conditions.length);
  return conditions[index]!;
}