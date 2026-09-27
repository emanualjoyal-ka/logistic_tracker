import {
  OrderStatus,
} from "@/types/order";

interface Props {
  status: OrderStatus;
}

const STEPS: {status: OrderStatus;label: string;}[] = [
  {
    status: "PENDING",
    label: "Order placed",
  },
  {
    status: "ASSIGNED",
    label: "Partner assigned",
  },
  {
    status: "ACCEPTED",
    label: "Partner accepted",
  },
  {
    status: "PICKED_UP",
    label: "Order picked up",
  },
  {
    status: "IN_TRANSIT",
    label: "In transit",
  },
  {
    status: "DELIVERED",
    label: "Delivered",
  },
];

function getStepIndex(status: OrderStatus): number {
  if (status === "CANCELLED") {
    return -1;
  }

  return STEPS.findIndex(
    (step) =>
      step.status === status
  );
}

export default function OrderStatusTimeline({status}: Props) {
  const currentIndex =
    getStepIndex(status);

  if (status === "CANCELLED") {
    return (
      <div className="rounded-lg border p-4">
        <p className="font-semibold">
          Order cancelled
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {STEPS.map(
        (step, index) => {
          const completed =
            index <= currentIndex;

          return (
            <div
              key={step.status}
              className="flex items-center gap-3"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  completed
                    ? "font-semibold"
                    : "text-gray-400"
                }`}
              >
                {completed
                  ? "✓"
                  : index + 1}
              </div>

              <div>
                <p
                  className={
                    completed
                      ? "font-medium"
                      : "text-gray-400"
                  }
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}