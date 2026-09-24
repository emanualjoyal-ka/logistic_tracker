// "use client";

// import * as React from "react";
// import { useCallback, useState } from "react";
// import { useOrderTracking } from "@/hooks/use-order-tracking";

// export default function OrderTrackingPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = React.use(params);
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   const handleLocationUpdate = useCallback((update: any) => {
//     console.log("📍 Page received location update:", update);
//     setLocation({
//       latitude: update.latitude,
//       longitude: update.longitude,
//     });
//   }, []);

//   useOrderTracking(id, handleLocationUpdate);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Live Tracking</h1>
//       <p><strong>Order ID:</strong> {id}</p>
      
//       {location ? (
//         <div style={{ background: "#e0ffe0", padding: "10px", marginTop: "10px" }}>
//           <p><strong>Latitude:</strong> {location.latitude}</p>
//           <p><strong>Longitude:</strong> {location.longitude}</p>
//         </div>
//       ) : (
//         <p style={{ color: "orange" }}>⏳ Waiting for coordinates from socket server...</p>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useParams } from "next/navigation";
// import DeliveryMap from "@/components/tracking/DeliveryMap";
// import {useOrderTracking} from "@/hooks/use-order-tracking";

// const TrackingPage=()=> {
//   const params = useParams();
//   const orderId =params.id as string;
//   const {
//     partnerLocation,
//     isConnected,
//     error
//   } = useOrderTracking(orderId);
//   // Temporary coordinates.
//   // Later these will come from the order API.
//   const pickup = {
//     latitude: 10.0159,
//     longitude: 76.3419,
//   };

//   const dropoff = {
//     latitude: 10.0261,
//     longitude: 76.3125,
//   };

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-bold">Live Delivery Tracking</h1>
//       <p className="mt-2">
//         Connection:{" "} {isConnected ? "Connected" : "Disconnected"}
//       </p>
//       {error && (
//         <p className="mt-2 text-red-500">{error}</p>
//       )}
//       {partnerLocation ? (
//         <div className="mt-6">
//           <DeliveryMap
//             pickup={pickup}
//             partner={partnerLocation}
//             dropoff={dropoff}
//           />
//         </div>
//       ) : (
//         <p className="mt-6">
//           Waiting for delivery partner
//           location...
//         </p>
//       )}
//     </main>
//   );
// }

// export default TrackingPage;

"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useOrderTracking } from "@/hooks/use-order-tracking";

const DeliveryMap = dynamic(() => import("@/components/tracking/DeliveryMap"), {
  ssr: false,
  loading: () => <p className="mt-6">Loading map...</p>,
});

const TrackingPage = () => {
  const params = useParams();
  const orderId = params.id as string;
  const { partnerLocation, isConnected, error } = useOrderTracking(orderId);

  const pickup = { latitude: 10.0159, longitude: 76.3419 };
  const dropoff = { latitude: 10.0261, longitude: 76.3125 };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Live Delivery Tracking</h1>
      <p className="mt-2">Connection: {isConnected ? "Connected" : "Disconnected"}</p>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {partnerLocation ? (
        <div className="mt-6">
          <DeliveryMap pickup={pickup} partner={partnerLocation} dropoff={dropoff} />
        </div>
      ) : (
        <p className="mt-6">Waiting for delivery partner location...</p>
      )}
    </main>
  );
};

export default TrackingPage;