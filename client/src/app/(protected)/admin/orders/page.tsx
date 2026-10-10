"use client";

import Link from "next/link";
import { useAdminOrders } from "@/hooks/use-admin";

const statusStyles: Record<string, string> = {
  DELIVERED: "bg-emerald-50 text-emerald-700",
  PENDING: "bg-amber-50 text-amber-700",
  IN_TRANSIT: "bg-blue-50 text-blue-700",
  CANCELLED: "bg-red-50 text-red-700",
};

const AdminOrdersPage = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useAdminOrders();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border bg-white p-8 text-center">
            Loading orders...
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
            Failed to load orders.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              All Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage deliveries and delivery partner assignments.
            </p>
          </div>

          <div className="rounded-lg bg-white px-4 py-2 text-sm shadow-sm ring-1 ring-gray-200">
            <span className="text-gray-500">Total: </span>
            <span className="font-semibold text-gray-900">
              {orders?.length ?? 0}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Order
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Route
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Partner
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Fee
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orders?.map((order) => {
                  const assignment = order.assignments?.[0];

                  return (
                    <tr
                      key={order.id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Order */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {order.orderNumber}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN"
                          )}
                        </p>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900">
                          {order.customer.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {order.customer.email}
                        </p>
                      </td>

                      {/* Route */}
                      <td className="px-5 py-4">
                        <div className="max-w-[180px]">
                          <p className="truncate text-sm text-gray-900">
                            {order.pickupAddress}
                          </p>

                          <p className="my-1 text-xs text-gray-400">
                            ↓ {order.distanceKm.toFixed(1)} km ↓
                          </p>

                          <p className="truncate text-sm text-gray-900">
                            {order.dropoffAddress}
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            statusStyles[order.status] ??
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status.replaceAll("_", " ")}
                        </span>
                      </td>

                      {/* Partner */}
                      <td className="px-5 py-4">
                        {assignment ? (
                          <div>
                            <p className="font-medium text-gray-900">
                              {assignment.deliveryPartner.user.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {assignment.deliveryPartner.vehicleNumber}
                            </p>
                          </div>
                        ) : (
                          <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* Fee */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-gray-900">
                          ₹{Number(order.deliveryFee).toFixed(2)}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!orders?.length && (
            <div className="p-12 text-center">
              <p className="font-medium text-gray-900">
                No orders found
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Orders will appear here when they are created.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminOrdersPage;
