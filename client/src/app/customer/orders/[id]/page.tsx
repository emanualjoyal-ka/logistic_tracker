"use client";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useOrderTracking } from "@/hooks/use-order-tracking";
import { useOrder } from "@/hooks/use-orders";
import OrderStatusTimeline from "@/components/customer/OrderStatusTimeline";
import OrderStatusBadge from "@/components/customer/OrderStatusBadge";
import { useCurrentTracking } from "@/hooks/use-tracking";

const DeliveryMap = dynamic(() => import("@/components/tracking/DeliveryMap"), {
  ssr: false, loading: () => <p className="mt-6">Loading map...</p>,
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
    <main className="mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Order</p>
          <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
        </div>
        <OrderStatusBadge status={order.status}/>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <section>
          <OrderStatusTimeline status={order.status}/>
          <div className="mt-8 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Pickup</p>
              <p>{order.pickupAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Drop-off</p>
              <p>{order.dropoffAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Distance</p>
              <p>{order.distanceKm} km</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery fee</p>
              <p>₹{order.deliveryFee}</p>
            </div>
          </div>
        </section>
        <section className="lg:col-span-2">
          <div className="mb-3">
            <p className="text-sm">
              Tracking:{" "} {isConnected ? "Live" : "Connecting..."}
            </p>
          </div>
          {liveLocation?.latitude != null && liveLocation?.longitude != null ? (
            <DeliveryMap
              pickup={{
                latitude:order.pickupLatitude,
                longitude:order.pickupLongitude,
              }}
              partner={{
                latitude:liveLocation.latitude,
                longitude:liveLocation.longitude,
              }}
              dropoff={{
                latitude:order.dropoffLatitude,
                longitude:order.dropoffLongitude,
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