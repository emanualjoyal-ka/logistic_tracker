"use client";
import Stat from "@/components/admin/StatCard";
import Skeleton from "@/components/ui/Skeleton";
import {useAdminDashboard} from "@/hooks/use-admin";

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
    <div className="min-h-screen">
      <p className="font-bold text-xl mb-3">Order statistics</p>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Stat label="Total Orders" value={data.totalOrders}/>
        <Stat label="Pending" value={data.pendingOrders}/>
        <Stat label="Active" value={data.activeOrders}/>
        <Stat label="Delivered" value={data.deliveredOrders}/>
      </div>
      <p className="font-bold text-xl mb-3 mt-6">Workforce statistics</p>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Stat label="Total Partners" value={data.totalPartners}/>
        <Stat label="Available Partners" value={data.availablePartners}/>
      </div>
    </div>
  );
}

export default AdminDashboardPage;