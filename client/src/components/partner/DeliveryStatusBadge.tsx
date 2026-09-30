import { OrderStatus } from "@/types/order";

interface Props {
  status: OrderStatus;
}

const LABELS: Record<OrderStatus,string> = {
  PENDING: "Pending",
  ASSIGNED: "Assigned",
  ACCEPTED: "Accepted",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled"
};

export default function DeliveryStatusBadge({status}: Props) {
  return (
    <span className="rounded-full border px-3 py-1 text-sm">
      {LABELS[status]}
    </span>
  );
}