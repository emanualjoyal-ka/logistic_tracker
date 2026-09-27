import Link from "next/link";

import {
  Order,
} from "@/types/order";

import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  order: Order;
}

export default function OrderCard({
  order,
}: Props) {
  return (
    <article className="rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Order
          </p>

          <h2 className="font-semibold">
            {order.orderNumber}
          </h2>
        </div>

        <OrderStatusBadge
          status={order.status}
        />
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <p className="text-xs text-gray-500">
            PICKUP
          </p>

          <p>
            {order.pickupAddress}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            DROPOFF
          </p>

          <p>
            {order.dropoffAddress}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p>
          ₹{order.deliveryFee}
        </p>

        <Link
          href={`/customer/orders/${order.id}`}
          className="rounded-lg border px-4 py-2"
        >
          View tracking
        </Link>
      </div>
    </article>
  );
}