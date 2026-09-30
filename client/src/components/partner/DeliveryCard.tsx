import Link from "next/link";

import { PartnerOrder } from "@/types/partner";

import DeliveryStatusBadge from "./DeliveryStatusBadge";

interface Props {
  order: PartnerOrder;
}

export default function DeliveryCard({
  order,
}: Props) {
  return (
    <article className="rounded-xl border p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Delivery
          </p>

          <h2 className="font-semibold">
            {order.orderNumber}
          </h2>
        </div>

        <DeliveryStatusBadge
          status={order.status}
        />
      </div>

      {/* Route */}
      <div className="mt-5 space-y-4">

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
            DROP-OFF
          </p>

          <p>
            {order.dropoffAddress}
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            Distance
          </p>

          <p>
            {order.distanceKm} km
          </p>
        </div>

        <Link
          href={`/partner/deliveries/${order.id}`}
          className="rounded-lg border px-4 py-2"
        >
          View Delivery
        </Link>

      </div>
    </article>
  );
}