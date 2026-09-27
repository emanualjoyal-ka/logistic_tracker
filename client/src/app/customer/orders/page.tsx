"use client";

import OrderCard from "@/components/customer/OrderCard";
import { useOrders } from "@/hooks/use-orders";

export default function OrdersPage() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useOrders();

  if (isLoading) {
    return (
      <main className="p-6">
        <p>Loading orders...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6">
        <p>
          Failed to load orders.
        </p>

        <p className="text-sm text-gray-500">
          {error instanceof Error
            ? error.message
            : "Unknown error"}
        </p>
      </main>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">
          My Orders
        </h1>

        <p className="mt-4">
          You haven't created any
          orders yet.
        </p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        My Orders
      </h1>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          // <div
          //   key={order.id}
          //   className="rounded-lg border p-4"
          // >
          //   <p className="font-semibold">
          //     {order.orderNumber}
          //   </p>

          //   <p>
          //     {order.pickupAddress}
          //   </p>

          //   <p>
          //     {order.dropoffAddress}
          //   </p>

          //   <p className="mt-2">
          //     Status: {order.status}
          //   </p>
          // </div>
          <OrderCard key={order.id} order={order}/>
        ))}
      </div>
    </main>
  );
}