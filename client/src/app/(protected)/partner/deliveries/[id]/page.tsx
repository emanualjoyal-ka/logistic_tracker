"use client";
import { useParams } from "next/navigation";
import {usePartnerOrder} from "@/hooks/use-partner-deliveries";
import DeliveryStatusBadge from "@/components/partner/DeliveryStatusBadge";
import DeliveryActionButton from "@/components/partner/DeliveryActionButton";

const PartnerDeliveryPage=()=> {
  const params = useParams();
  const orderId = params.id as string;
  const {data: order,isLoading,isError} = usePartnerOrder(orderId);
  if (isLoading) {
    return (
      <main className="p-6">Loading delivery...</main>
    );
  }
  if (isError || !order) {
    return (
      <main className="p-6">Delivery not found.</main>
    );
  }
  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Delivery</p>
          <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
        </div>
        <DeliveryStatusBadge status={order.status}/>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Pickup</h2>
          <p className="mt-3">{order.pickupAddress}</p>
        </section>
        <section className="rounded-xl border p-6">
          <h2 className="text-lg font-semibold">Drop-off</h2>
          <p className="mt-3">{order.dropoffAddress}</p>
        </section>
      </div>
      <section className="mt-6 rounded-xl border p-6">
        <h2 className="text-lg font-semibold">Delivery Information</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Distance</p>
            <p>{order.distanceKm} km</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Delivery Fee</p>
            <p>₹{order.deliveryFee}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p>{order.status}</p>
          </div>
        </div>
      </section>
      <section className="mt-6 rounded-xl border p-6">
        <h2 className="text-lg font-semibold">Delivery Action</h2>
        <div className="mt-4">
          <DeliveryActionButton orderId={order.id} status={order.status}/>
        </div>
      </section>
    </main>
  );
}

export default PartnerDeliveryPage;