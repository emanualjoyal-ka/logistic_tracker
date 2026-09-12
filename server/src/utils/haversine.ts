/*
 Convert degrees to radians.
 Math.sin(), Math.cos() etc expect radians rather than degrees.
 */
const toRadians=(degrees: number): number=> {
  return degrees * (Math.PI / 180);
}

/*
 Calculate the straight-line distance between two geographic coordinates.
  Result is returned in kilometers.
 */
export function calculateDistanceKm(latitude1: number,longitude1: number,latitude2: number,longitude2: number): number {
  const earthRadiusKm = 6371;

  // Difference between the coordinates.
  const latitudeDifference = toRadians(latitude2 - latitude1);
  const longitudeDifference = toRadians(longitude2 - longitude1);

  // Convert both latitudes to radians.
  const lat1 = toRadians(latitude1);
  const lat2 = toRadians(latitude2);

  // Haversine formula.
  const a =Math.sin(latitudeDifference / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(longitudeDifference / 2) ** 2;
  
  // central angle ( angle between locations )
  const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1 - a));

  //distance in KM
  return earthRadiusKm * c;
}