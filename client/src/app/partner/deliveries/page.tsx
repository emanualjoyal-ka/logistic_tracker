"use client";
import { usePartnerOrders } from "@/hooks/use-partner-deliveries";
import DeliveryCard from "@/components/partner/DeliveryCard";

const PartnerDeliveriesPage=()=> {
  const {data: orders,isLoading,isError} = usePartnerOrders();
  if (isLoading) {
    return (
      <main className="p-6">
        <p>Loading deliveries...</p>
      </main>
    );
  }
  if (isError) {
    return (
      <main className="p-6">
        <p>Failed to load deliveries.</p>
      </main>
    );
  }
  if (!orders || orders.data.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Deliveries</h1>
        <p className="mt-4 text-gray-500">No deliveries assigned yet.</p>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">My Deliveries</h1>
      <div className="mt-6 space-y-4">
        {orders.data.map((order) => (
          <DeliveryCard key={order.id} order={order}/>
        ))}
      </div>
    </main>
  );
}

export default PartnerDeliveriesPage;