interface Coordinates {
  latitude: number;
  longitude: number;
}


export const moveToward=(current: Coordinates,destination: Coordinates,stepRatio: number = 0.1): Coordinates=> {
  const latitudeDifference = destination.latitude - current.latitude;
  const longitudeDifference = destination.longitude - current.longitude;
  return {
    latitude: current.latitude + latitudeDifference * stepRatio,
    longitude: current.longitude + longitudeDifference * stepRatio,
  };
}