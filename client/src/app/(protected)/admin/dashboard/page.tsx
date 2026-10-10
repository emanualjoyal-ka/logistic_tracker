"use client";
import {useAdminDashboard} from "@/hooks/use-admin";
import Link from "next/link";

const AdminDashboardPage=()=> {
  const {data,isLoading,isError} = useAdminDashboard();
  if (isLoading) {
    return (
      <main className="p-6">
        Loading admin dashboard...
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="p-6">
        Failed to load dashboard.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="text-3xl font-bold">
        Operations Dashboard
      </h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Stat label="Orders" value={data.totalOrders}/>
        <Stat label="Pending" value={data.pendingOrders}/>
        <Stat label="Active" value={data.activeOrders}/>
        <Stat label="Delivered" value={data.deliveredOrders}/>
        <Stat label="Partners" value={data.totalPartners}/>
        <Stat label="Available" value={data.availablePartners}/>
      </div>
      <Link href="/admin/orders" className="rounded-lg border px-5 py-3">View Orders</Link>
      <Link href="/admin/partners" className="rounded-lg border px-5 py-3">View Partners</Link>
    </main>
  );
}

const Stat=({label,value}: {label: string;value: number;})=> {
  return (
    <div className="rounded-xl border p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

export default AdminDashboardPage;