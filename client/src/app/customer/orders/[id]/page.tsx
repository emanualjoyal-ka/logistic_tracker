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
import { useOrder } from "@/hooks/use-orders";
import OrderStatusTimeline from "@/components/customer/OrderStatusTimeline";
import OrderStatusBadge, { STATUS_LABELS } from "@/components/customer/OrderStatusBadge";
import { useCurrentTracking } from "@/hooks/use-tracking";

const DeliveryMap = dynamic(() => import("@/components/tracking/DeliveryMap"), {
  ssr: false,
  loading: () => <p className="mt-6">Loading map...</p>,
});

const TrackingPage = () => {
  const params = useParams();
  const orderId = params.id as string;
  const {data: order,isLoading,isError} = useOrder(orderId);
  const {data: tracking,isLoading: trackingLoading,} = useCurrentTracking(orderId);
  const { partnerLocation, isConnected, error } = useOrderTracking(orderId);

    if (isLoading || trackingLoading) {
    return (
      <main className="p-6">
        <p>Loading order...</p>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="p-6">
        <p>Order not found.</p>
      </main>
    );
  }

  const liveLocation = partnerLocation ?? tracking?.partner;

  return (
    // <main className="p-6">
    //   <div>
    //      <p className="text-sm text-gray-500">Order</p>
    //     <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
    //     <OrderStatusBadge status={order.status}/>
    //     <OrderStatusTimeline status={order.status}/>
    //     <p>Pickup</p>
    //     <p>{order.pickupAddress}</p>
    //     <p>Drop-off</p>
    //     <p>{order.dropoffAddress}</p>
    //     <p>Distance :{order.distanceKm} Km</p>
    //     <p>Delivery fee :₹{order.deliveryFee}</p>
    //   </div>
    //   <h1 className="text-2xl font-bold">Live Delivery Tracking</h1>
    //   <p className="mt-2">Connection: {isConnected ? "Connected" : "Disconnected"}</p>
    //   {error && <p className="mt-2 text-red-500">{error}</p>}
    //   {partnerLocation ? (
    //     <div className="mt-6">
    //       <DeliveryMap 
    //       pickup={{
    //         latitude: order.pickupLatitude,
    //         longitude: order.pickupLongitude}}
    //       partner={partnerLocation}
    //       dropoff={{
    //         latitude: order.dropoffLatitude,
    //         longitude: order.dropoffLongitude}}
    //       />
    //     </div>
    //   ) : (
    //     <p className="mt-6">Waiting for delivery partner location...</p>
    //   )}
    // </main>
    <main className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Order
          </p>

          <h1 className="text-2xl font-bold">
            {order.orderNumber}
          </h1>
        </div>

        <OrderStatusBadge
          status={order.status}
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <section>
          <OrderStatusTimeline
            status={order.status}
          />

          <div className="mt-8 space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                Pickup
              </p>

              <p>
                {order.pickupAddress}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Drop-off
              </p>

              <p>
                {order.dropoffAddress}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Distance
              </p>

              <p>
                {order.distanceKm} km
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Delivery fee
              </p>

              <p>
                ₹{order.deliveryFee}
              </p>
            </div>
          </div>
        </section>

        <section className="lg:col-span-2">
          <div className="mb-3">
            <p className="text-sm">
              Tracking:{" "}
              {isConnected
                ? "Live"
                : "Connecting..."}
            </p>
          </div>

          {liveLocation?.latitude != null &&
          liveLocation?.longitude != null ? (
            <DeliveryMap
              pickup={{
                latitude:
                  order.pickupLatitude,
                longitude:
                  order.pickupLongitude,
              }}
              partner={{
                latitude:
                  liveLocation.latitude,
                longitude:
                  liveLocation.longitude,
              }}
              dropoff={{
                latitude:
                  order.dropoffLatitude,
                longitude:
                  order.dropoffLongitude,
              }}
            />
          ) : (
            <div className="flex h-[500px] items-center justify-center rounded-lg border">
              Waiting for delivery
              partner location...
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default TrackingPage;