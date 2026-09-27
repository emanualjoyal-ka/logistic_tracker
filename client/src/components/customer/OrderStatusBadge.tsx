import {OrderStatus} from "@/types/order";

interface Props {
  status: OrderStatus;
}

export const STATUS_LABELS: Record<OrderStatus,string> = {
  PENDING: "Pending",
  ASSIGNED: "Partner Assigned",
  ACCEPTED: "Accepted",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled"
};

export default function OrderStatusBadge({status}: Props) {
  return (
    <span className="rounded-full border px-3 py-1 text-sm">
      {STATUS_LABELS[status]}
    </span>
  );
}