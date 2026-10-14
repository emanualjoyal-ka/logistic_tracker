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
  const {data: orders,isLoading,isError} = useAdminOrders();
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
    <main className="min-h-screen">
      <div>
        <div className="mb-6 flex items-center justify-between">
            <p className="mt-1 text-sm">
              Manage deliveries and delivery partner assignments.
            </p>
          <div className="px-4">
            <span>Total: </span>
            <span className="font-semibold">
              {orders?.length ?? 0}
            </span>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full text-center bg-black">
              <thead className="border-b border-white/20 text-white">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">Order</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">Customer</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">Route</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">Status</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">Partner</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide">Fee</th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {orders?.map((order) => {
                  const assignment = order.assignments?.[0];
                  return (
                    <tr key={order.id} className="transition hover:bg-white/5">
                      <td className="px-5 py-4">
                        <p className="font-semibold">{order.orderNumber}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString("en-IN")}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium capitalize">{order.customer.name}</p>
                        <p className="text-xs text-gray-500">{order.customer.email}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="max-w-[180px]">
                          <p className="truncate text-sm capitalize">{order.pickupAddress}</p>
                          <p className="my-1 text-xs text-gray-400">↓ {order.distanceKm.toFixed(1)} km ↓</p>
                          <p className="truncate text-sm capitalize">{order.dropoffAddress}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status] ?? "bg-gray-100 text-gray-700"}`}>
                          {order.status.replaceAll("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {assignment ? (
                          <div>
                            <p className="font-medium">{assignment.deliveryPartner.user.name}</p>
                            <p className="text-xs text-gray-500">{assignment.deliveryPartner.vehicleNumber}</p>
                          </div>
                        ) : (
                          <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-semibold">₹{Number(order.deliveryFee).toFixed(2)}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link href={`/admin/orders/${order.id}`} className="inline-flex rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/50">
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
              <p className="font-medium text-gray-900">No orders found</p>
              <p className="mt-1 text-sm text-gray-500">Orders will appear here when they are created.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminOrdersPage;
