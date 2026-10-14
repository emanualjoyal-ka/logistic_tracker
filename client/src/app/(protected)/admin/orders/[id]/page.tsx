"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {useAdminOrder,useAvailablePartners,useAssignOrder} from "@/hooks/use-admin";
import Info from "@/components/admin/Info";
import LocationCard from "@/components/admin/LocationCard";
import PriceRow from "@/components/admin/PriceRow";

const AdminOrderDetailsPage = () => {
  const params = useParams();
  const orderId = params.id as string;
  const { data: orders, isLoading: ordersLoading } = useAdminOrder(orderId);
  const {data: partners,isLoading: partnersLoading} = useAvailablePartners();
  const assignOrder = useAssignOrder();
  const [selectedPartnerId, setSelectedPartnerId] =useState("");
  if (ordersLoading) {
    return (
      <main className="min-h-screen bg-black p-6">
        <div className="mx-auto max-w-7xl">
          Loading order...
        </div>
      </main>
    );
  }
  if (!orders) {
    return (
      <main className="min-h-screen bg-black p-6">
        <div className="mx-auto max-w-7xl rounded-xl border bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Order not found</h1>
          <Link href="/admin/orders" className="mt-4 inline-block text-sm font-medium text-blue-600">
            Back to orders
          </Link>
        </div>
      </main>
    );
  }
  const assignment = orders.assignments?.[0];
  const handleAssign = () => {
    if (!selectedPartnerId) return;
    assignOrder.mutate({
      orderId: orders.id,
      deliveryPartnerId: selectedPartnerId
    });
  };

  return (
    <main className="min-h-screen p-6">
      <div>
        <div className="mb-6">
          <Link href="/admin/orders" className="text-sm font-medium bg-white/20 py-3 px-4 rounded-md">Back to Orders</Link>
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold">{orders.orderNumber}</h1>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {orders.status.replaceAll("_", " ")}
              </span>
            </div>
            <p className="mt-1 text-sm capitalize">
              {orders.pickupAddress} → {orders.dropoffAddress}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-white/20 bg-black shadow-sm">
              <div className="border-b px-6 py-4 border-white/20">
                <h2 className="font-semibold">Customer</h2>
              </div>
              <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-3">
                <Info label="Name" value={orders.customer.name} className="capitalize"/>
                <Info label="Email" value={orders.customer.email}/>
                <Info label="Customer ID" value={orders.customer.id}/>
              </div>
            </section>
            <section className="rounded-2xl border border-white/20 bg-black">
              <div className="border-b px-6 py-4 border-white/20">
                <h2 className="font-semibold">Delivery Route</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <LocationCard
                    type="Pickup"
                    address={orders.pickupAddress}
                    latitude={orders.pickupLatitude}
                    longitude={orders.pickupLongitude}
                    color="blue"
                  />
                  <LocationCard
                    type="Dropoff"
                    address={orders.dropoffAddress}
                    latitude={orders.dropoffLatitude}
                    longitude={orders.dropoffLongitude}
                    color="green"
                  />
                </div>
                <div className="mt-4 rounded-xl bg-white/20 p-4 text-white">
                  <p className="text-xs">DISTANCE</p>
                  <p className="mt-1 text-xl font-bold">
                    {orders.distanceKm.toFixed(2)} km
                  </p>
                </div>
              </div>
            </section>
            <section className="rounded-2xl border bg-black border-white/20">
              <div className="border-b border-white/20 px-6 py-4">
                <h2 className="font-semibold">Pricing</h2>
              </div>
              <div className="space-y-4 p-6">
                <PriceRow label="Base Fee" value={orders.pricingQuote.baseFee}/>
                <PriceRow label="Distance Fee" value={orders.pricingQuote.distanceFee}/>
                <PriceRow label="Traffic Multiplier" value={`×${orders.pricingQuote.trafficMultiplier}`}/>
                <PriceRow label="Weather Multiplier" value={`×${orders.pricingQuote.weatherMultiplier}`}/>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold">
                      ₹{Number(orders.pricingQuote.totalFee).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {assignment && (
              <section className="rounded-2xl border border-white/20 bg-black shadow-sm">
                <div className="border-b border-white/20 px-6 py-4">
                  <h2 className="font-semibold">Current Delivery Partner</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-3">
                  <Info label="Name" value={assignment.deliveryPartner.user.name}/>
                  <Info label="Vehicle" value={`${assignment.deliveryPartner.vehicleType} • ${assignment.deliveryPartner.vehicleNumber}`}/>
                  <Info label="Email" value={assignment.deliveryPartner.user.email}/>
                </div>
              </section>
            )}
          </div>
          <div className="space-y-6">
            <section className="rounded-2xl border bg-black border-white/20">
              <div className="border-b px-6 py-4 border-white/20">
                <h2 className="font-semibold">
                  {assignment ? "Reassign Partner" : "Assign Partner"}
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Select an available delivery partner.
                </p>
              </div>
              <div className="p-6">
                {partnersLoading ? (
                  <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
                    Loading available partners...
                  </div>
                ) : !partners?.data?.length ? (
                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <p className="text-sm font-semibold text-orange-800">
                      No available partners
                    </p>
                    <p className="mt-1 text-xs text-orange-700">
                      There are currently no delivery partners
                      available for assignment.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {partners.data.map((partner) => (
                        <label
                          key={partner.id}
                          className={`block cursor-pointer rounded-xl border border-white/20 p-4 transition ${
                          selectedPartnerId === partner.id ? " bg-white/5 ring-1 ring-white/50" : "border-gray-200 hover:bg-white/5"}`}>
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="partner"
                              value={partner.id}
                              checked={selectedPartnerId === partner.id}
                              onChange={(event) =>setSelectedPartnerId(event.target.value)}
                              className="mt-1 h-4 w-4 text-blue-600"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold">
                                {partner.user?.name}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                {partner.user?.email}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="rounded-full bg-white/20 px-2 py-1 text-xs">
                                  {partner.vehicleType}
                                </span>
                                <span className="rounded-full bg-white/20  px-2 py-1 text-xs">
                                  {partner.vehicleNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <button
                      type="button"
                      disabled={!selectedPartnerId || assignOrder.isPending}
                      onClick={handleAssign}
                      className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500">
                      {assignOrder.isPending ? "Assigning..." : assignment ? "Reassign Partner" : "Assign Partner"}
                    </button>
                    {assignOrder.isSuccess && (
                      <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                        Partner assigned successfully.
                      </div>
                    )}
                    {assignOrder.isError && (
                      <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        Failed to assign partner. Please try
                        again.
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminOrderDetailsPage;
