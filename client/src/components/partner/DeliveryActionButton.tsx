"use client";

import { OrderStatus } from "@/types/order";

import {
  useAcceptOrder,
  usePickupOrder,
  useStartOrder,
  useDeliverOrder,
} from "@/hooks/use-partner-deliveries";

interface Props {
  orderId: string;
  status: OrderStatus;
}

export default function DeliveryActionButton({
  orderId,
  status,
}: Props) {

  const acceptMutation =
    useAcceptOrder();

  const pickupMutation =
    usePickupOrder();

  const startMutation =
    useStartOrder();

  const deliverMutation =
    useDeliverOrder();

  /*
   * ASSIGNED → ACCEPTED
   */
  if (status === "ASSIGNED") {
    return (
      <button
        onClick={() =>
          acceptMutation.mutate(orderId)
        }
        disabled={acceptMutation.isPending}
        className="rounded-lg border px-4 py-2"
      >
        {acceptMutation.isPending
          ? "Accepting..."
          : "Accept Delivery"}
      </button>
    );
  }

  /*
   * ACCEPTED → PICKED_UP
   */
  if (status === "ACCEPTED") {
    return (
      <button
        onClick={() =>
          pickupMutation.mutate(orderId)
        }
        disabled={pickupMutation.isPending}
        className="rounded-lg border px-4 py-2"
      >
        {pickupMutation.isPending
          ? "Updating..."
          : "Mark Picked Up"}
      </button>
    );
  }

  /*
   * PICKED_UP → IN_TRANSIT
   */
  if (status === "PICKED_UP") {
    return (
      <button
        onClick={() =>
          startMutation.mutate(orderId)
        }
        disabled={startMutation.isPending}
        className="rounded-lg border px-4 py-2"
      >
        {startMutation.isPending
          ? "Starting..."
          : "Start Delivery"}
      </button>
    );
  }

  /*
   * IN_TRANSIT → DELIVERED
   */
  if (status === "IN_TRANSIT") {
    return (
      <button
        onClick={() =>
          deliverMutation.mutate(orderId)
        }
        disabled={deliverMutation.isPending}
        className="rounded-lg border px-4 py-2"
      >
        {deliverMutation.isPending
          ? "Completing..."
          : "Mark Delivered"}
      </button>
    );
  }

  /*
   * DELIVERED / CANCELLED / PENDING
   *
   * No action available.
   */
  return null;
}