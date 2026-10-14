"use client";
import Link from "next/link";
import {usePartnerOrders,usePartnerProfile} from "@/hooks/use-partner-deliveries";

const PartnerDashboardPage=()=> {
  const {data: profile,isLoading: profileLoading} = usePartnerProfile();
  const {data: orders,isLoading: ordersLoading} = usePartnerOrders();
  if (profileLoading || ordersLoading) {
    return (
      <main className="p-6">Loading dashboard...</main>
    );
  }
  const deliveries = orders?.data ?? [];;
  const activeOrders = deliveries.filter((order) => order.status === "ACCEPTED" || order.status === "PICKED_UP" || order.status === "IN_TRANSIT");
  const completedOrders = deliveries.filter((order) =>order.status === "DELIVERED");
  return (
    <main className="p-4">
      {profile && (
        <section className="rounded-xl border border-white/20 bg-black p-5">
          <h2 className="font-semibold">Vehicle</h2>
          <p className="mt-2">{profile.vehicleType}</p>
          <p className="text-sm text-gray-500">{profile.vehicleNumber}</p>
          <p className="mt-2 text-sm">
            Availability:{" "}<span className="font-bold">{profile.isAvailable ? "Available" : "Unavailable"}</span>
          </p>
        </section>
      )}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Assigned</p>
          <p className="mt-2 text-3xl font-bold">{deliveries.length}</p>
        </div>
        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Active</p>
          <p className="mt-2 text-3xl font-bold">{activeOrders.length}</p>
        </div>
        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="mt-2 text-3xl font-bold">{completedOrders.length}</p>
        </div>
      </div>
    </main>
  );
}

export default PartnerDashboardPage;