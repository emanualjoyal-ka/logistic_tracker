// "use client"
// import { useAdminOrder } from "@/hooks/use-admin";
// import { useParams } from "next/navigation";
// import React from "react";

// interface DeliveryPartnerUser {
//   id: string;
//   name: string;
//   email: string;
// }

// interface DeliveryPartner {
//   id: string;
//   vehicleType: string;
//   vehicleNumber: string;
//   user: DeliveryPartnerUser;
// }

// interface Assignment {
//   id: string;
//   assignedAt: string;
//   acceptedAt: string;
//   completedAt: string;
//   deliveryPartner: DeliveryPartner;
// }

// interface PricingQuote {
//   baseFee: string;
//   distanceFee: string;
//   trafficCondition: string;
//   trafficMultiplier: string;
//   weatherCondition: string;
//   weatherMultiplier: string;
//   totalFee: string;
// }

// export interface AdminOrder {
//   id: string;
//   orderNumber: string;
//   pickupAddress: string;
//   pickupLatitude: number;
//   pickupLongitude: number;
//   dropoffAddress: string;
//   dropoffLatitude: number;
//   dropoffLongitude: number;
//   distanceKm: number;
//   status: string;
//   deliveryFee: string;
//   createdAt: string;
//   updatedAt: string;
//   customer: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   assignments: Assignment[];
//   pricingQuote: PricingQuote;
// }

// interface AdminOrderDetailsProps {
//   order: AdminOrder;
// }

// const formatDate = (date: string) =>
//   new Intl.DateTimeFormat("en-IN", {
//     dateStyle: "medium",
//     timeStyle: "short",
//   }).format(new Date(date));

// const formatCurrency = (value: string | number) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(Number(value));

// const getStatusStyles = (status: string) => {
//   switch (status) {
//     case "DELIVERED":
//       return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20";

//     case "PENDING":
//       return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20";

//     case "CANCELLED":
//       return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20";

//     case "IN_TRANSIT":
//       return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20";

//     default:
//       return "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-500/20";
//   }
// };

// const InfoItem = ({
//   label,
//   value,
// }: {
//   label: string;
//   value: React.ReactNode;
// }) => (
//   <div>
//     <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
//       {label}
//     </p>
//     <p className="mt-1 text-sm font-medium text-gray-900">{value}</p>
//   </div>
// );

// const Section = ({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
//     <div className="border-b border-gray-100 px-6 py-4">
//       <h2 className="text-base font-semibold text-gray-900">{title}</h2>
//     </div>

//     <div className="p-6">{children}</div>
//   </section>
// );

// export default function AdminOrderDetails() {
// const params = useParams();
// const orderId = params.id as string;
// const {data: order,isLoading,isError} = useAdminOrder(orderId);
// if (isLoading) {
//     return (
//       <main className="p-6">
//         <p>Loading order...</p>
//       </main>
//     );
//   }
//   if (isError || !order) {
//     return (
//       <main className="p-6">
//         <p>Order not found.</p>
//       </main>
//     );
//   }
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
//               <span>Admin</span>
//               <span>/</span>
//               <span>Orders</span>
//               <span>/</span>
//               <span className="text-gray-900">{order.orderNumber}</span>
//             </div>

//             <div className="flex flex-wrap items-center gap-3">
//               <h1 className="text-2xl font-bold tracking-tight text-gray-900">
//                 Order #{order.orderNumber}
//               </h1>

//               <span
//                 className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
//                   order.status
//                 )}`}
//               >
//                 <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
//                 {order.status.replaceAll("_", " ")}
//               </span>
//             </div>

//             <p className="mt-1 text-sm text-gray-500">
//               Created {formatDate(order.createdAt)}
//             </p>
//           </div>

//           <div className="rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
//             <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
//               Delivery Fee
//             </p>
//             <p className="mt-1 text-xl font-bold text-gray-900">
//               {formatCurrency(order.deliveryFee)}
//             </p>
//           </div>
//         </div>

//         {/* Main grid */}
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* Left / Main */}
//           <div className="space-y-6 lg:col-span-2">
//             {/* Route */}
//             <Section title="Delivery Route">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                 {/* Pickup */}
//                 <div className="relative rounded-xl border border-gray-200 bg-gray-50 p-5">
//                   <div className="mb-4 flex items-center gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
//                       <svg
//                         className="h-5 w-5 text-blue-600"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                       >
//                         <path d="M12 2v20M5 9l7-7 7 7" />
//                       </svg>
//                     </div>

//                     <div>
//                       <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
//                         Pickup
//                       </p>
//                       <p className="font-semibold text-gray-900">
//                         {order.pickupAddress}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <InfoItem
//                       label="Latitude"
//                       value={order.pickupLatitude}
//                     />
//                     <InfoItem
//                       label="Longitude"
//                       value={order.pickupLongitude}
//                     />
//                   </div>
//                 </div>

//                 {/* Dropoff */}
//                 <div className="relative rounded-xl border border-gray-200 bg-gray-50 p-5">
//                   <div className="mb-4 flex items-center gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
//                       <svg
//                         className="h-5 w-5 text-emerald-600"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                       >
//                         <path d="M12 22s8-4.5 8-12a8 8 0 10-16 0c0 7.5 8 12 8 12z" />
//                         <circle cx="12" cy="10" r="2.5" />
//                       </svg>
//                     </div>

//                     <div>
//                       <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
//                         Dropoff
//                       </p>
//                       <p className="font-semibold text-gray-900">
//                         {order.dropoffAddress}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <InfoItem
//                       label="Latitude"
//                       value={order.dropoffLatitude}
//                     />
//                     <InfoItem
//                       label="Longitude"
//                       value={order.dropoffLongitude}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Distance */}
//               <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-900 px-5 py-4 text-white">
//                 <div>
//                   <p className="text-xs uppercase tracking-wide text-gray-400">
//                     Total Distance
//                   </p>
//                   <p className="mt-1 text-lg font-bold">
//                     {order.distanceKm.toFixed(2)} km
//                   </p>
//                 </div>

//                 <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-700">
//                   <div className="h-full w-3/4 rounded-full bg-blue-500" />
//                 </div>
//               </div>
//             </Section>

//             {/* Customer */}
//             <Section title="Customer Information">
//               <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
//                 <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
//                   {order.customer.name.charAt(0).toUpperCase()}
//                 </div>

//                 <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-3">
//                   <InfoItem label="Name" value={order.customer.name} />
//                   <InfoItem label="Email" value={order.customer.email} />
//                   <InfoItem label="Customer ID" value={order.customer.id} />
//                 </div>
//               </div>
//             </Section>

//             {/* Delivery Partner */}
//             {order.partner && (
//               <Section title="Delivery Partner">
//                 <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
//                   <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-100">
//                     <svg
//                       className="h-7 w-7 text-orange-600"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       viewBox="0 0 24 24"
//                     >
//                       <path d="M5 17h14M7 17V8h10l3 5v4M7 17a2 2 0 11-4 0 2 2 0 014 0zm14 0a2 2 0 11-4 0 2 2 0 014 0z" />
//                     </svg>
//                   </div>

//                   <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//                     <InfoItem
//                       label="Partner"
//                       value={order.partner.user.name}
//                     />

//                     <InfoItem
//                       label="Email"
//                       value={order.partner.user.email}
//                     />

//                     <InfoItem
//                       label="Vehicle Type"
//                       value={order.partner.vehicleType}
//                     />

//                     <InfoItem
//                       label="Vehicle Number"
//                       value={order.partner.vehicleNumber}
//                     />
//                   </div>
//                 </div>
//               </Section>
//             )}

//             {/* Assignment Timeline */}
//             {order.assignment && (
//               <Section title="Assignment Timeline">
//                 <div className="relative ml-3 border-l-2 border-gray-200 pl-7">
//                   <TimelineItem
//                     title="Assigned"
//                     date={order.assignment.assignedAt}
//                     color="blue"
//                   />

//                   <TimelineItem
//                     title="Accepted"
//                     date={order.assignment.acceptedAt}
//                     color="indigo"
//                   />

//                   <TimelineItem
//                     title="Completed"
//                     date={order.assignment.completedAt}
//                     color="emerald"
//                     last
//                   />
//                 </div>
//               </Section>
//             )}
//           </div>

//           {/* Right / Sidebar */}
//           <div className="space-y-6">
//             {/* Pricing */}
//             <Section title="Pricing Breakdown">
//               <div className="space-y-4">
//                 <PriceRow
//                   label="Base Fee"
//                   value={order.pricingQuote.baseFee}
//                 />

//                 <PriceRow
//                   label={`Distance (${order.distanceKm.toFixed(2)} km)`}
//                   value={order.pricingQuote.distanceFee}
//                 />

//                 <div className="border-t border-gray-100 pt-4">
//                   <div className="flex items-center justify-between">
//                     <span className="font-semibold text-gray-900">
//                       Total
//                     </span>

//                     <span className="text-xl font-bold text-gray-900">
//                       {formatCurrency(order.pricingQuote.totalFee)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Section>

//             {/* Conditions */}
//             <Section title="Delivery Conditions">
//               <div className="space-y-4">
//                 <ConditionCard
//                   label="Traffic"
//                   value={order.pricingQuote.trafficCondition}
//                   multiplier={order.pricingQuote.trafficMultiplier}
//                   color="amber"
//                 />

//                 <ConditionCard
//                   label="Weather"
//                   value={order.pricingQuote.weatherCondition}
//                   multiplier={order.pricingQuote.weatherMultiplier}
//                   color="blue"
//                 />
//               </div>
//             </Section>

//             {/* Order Information */}
//             <Section title="Order Information">
//               <div className="space-y-5">
//                 <InfoItem
//                   label="Order ID"
//                   value={
//                     <span className="break-all font-mono text-xs">
//                       {order.id}
//                     </span>
//                   }
//                 />

//                 <InfoItem
//                   label="Order Number"
//                   value={order.orderNumber}
//                 />

//                 <InfoItem
//                   label="Assignment ID"
//                   value={
//                     <span className="break-all font-mono text-xs">
//                       {order.assignment?.id ?? "—"}
//                     </span>
//                   }
//                 />

//                 <InfoItem
//                   label="Created At"
//                   value={formatDate(order.createdAt)}
//                 />

//                 <InfoItem
//                   label="Last Updated"
//                   value={formatDate(order.updatedAt)}
//                 />
//               </div>
//             </Section>

//             {/* Coordinates */}
//             <Section title="Coordinates">
//               <div className="space-y-4">
//                 <div className="rounded-xl bg-blue-50 p-4">
//                   <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
//                     Pickup
//                   </p>

//                   <p className="font-mono text-xs text-gray-700">
//                     {order.pickupLatitude}, {order.pickupLongitude}
//                   </p>
//                 </div>

//                 <div className="rounded-xl bg-emerald-50 p-4">
//                   <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-600">
//                     Dropoff
//                   </p>

//                   <p className="font-mono text-xs text-gray-700">
//                     {order.dropoffLatitude}, {order.dropoffLongitude}
//                   </p>
//                 </div>
//               </div>
//             </Section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function PriceRow({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <span className="text-sm text-gray-500">{label}</span>

//       <span className="text-sm font-semibold text-gray-900">
//         {formatCurrency(value)}
//       </span>
//     </div>
//   );
// }

// function ConditionCard({
//   label,
//   value,
//   multiplier,
//   color,
// }: {
//   label: string;
//   value: string;
//   multiplier: string;
//   color: "amber" | "blue";
// }) {
//   const styles =
//     color === "amber"
//       ? "bg-amber-50 text-amber-700"
//       : "bg-blue-50 text-blue-700";

//   return (
//     <div className={`rounded-xl p-4 ${styles}`}>
//       <div className="flex items-center justify-between">
//         <span className="text-sm font-semibold">{label}</span>

//         <span className="rounded-full bg-white/70 px-2 py-1 text-xs font-bold">
//           ×{multiplier}
//         </span>
//       </div>

//       <p className="mt-1 text-sm">{value}</p>
//     </div>
//   );
// }

// function TimelineItem({
//   title,
//   date,
//   color,
//   last = false,
// }: {
//   title: string;
//   date: string;
//   color: "blue" | "indigo" | "emerald";
//   last?: boolean;
// }) {
//   const dotStyles = {
//     blue: "bg-blue-500 ring-blue-100",
//     indigo: "bg-indigo-500 ring-indigo-100",
//     emerald: "bg-emerald-500 ring-emerald-100",
//   };

//   return (
//     <div className={`relative ${last ? "" : "pb-7"}`}>
//       <span
//         className={`absolute -left-[35px] top-0 h-4 w-4 rounded-full ring-4 ${dotStyles[color]}`}
//       />

//       <p className="text-sm font-semibold text-gray-900">{title}</p>

//       <p className="mt-1 text-xs text-gray-500">{formatDate(date)}</p>
//     </div>
//   );
// }
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import {
  useAdminOrder,
  useAvailablePartners,
  useAssignOrder,
} from "@/hooks/use-admin";

const AdminOrderDetailsPage = () => {
  const params = useParams();
  const orderId = params.id as string;

  const { data: orders, isLoading: ordersLoading } = useAdminOrder(orderId);
  console.log(orders);
  

  const {
    data: partners,
    isLoading: partnersLoading,
  } = useAvailablePartners();

  const assignOrder = useAssignOrder();

  const [selectedPartnerId, setSelectedPartnerId] =
    useState("");

  if (ordersLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          Loading order...
        </div>
      </main>
    );
  }

  if (!orders) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl rounded-xl border bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Order not found
          </h1>

          <Link
            href="/admin/orders"
            className="mt-4 inline-block text-sm font-medium text-blue-600"
          >
            ← Back to orders
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
      deliveryPartnerId: selectedPartnerId,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/orders"
            className="text-sm font-medium text-gray-500 hover:text-gray-900"
          >
            ← Back to orders
          </Link>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {orders.orderNumber}
              </h1>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {orders.status.replaceAll("_", " ")}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {orders.pickupAddress} → {orders.dropoffAddress}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main order information */}
          <div className="space-y-6 lg:col-span-2">
            {/* Customer */}
            <section className="rounded-2xl border bg-white shadow-sm">
              <div className="border-b px-6 py-4">
                <h2 className="font-semibold text-gray-900">
                  Customer
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-3">
                <Info
                  label="Name"
                  value={orders.customer.name}
                />

                <Info
                  label="Email"
                  value={orders.customer.email}
                />

                <Info
                  label="Customer ID"
                  value={orders.customer.id}
                />
              </div>
            </section>

            {/* Route */}
            <section className="rounded-2xl border bg-white shadow-sm">
              <div className="border-b px-6 py-4">
                <h2 className="font-semibold text-gray-900">
                  Delivery Route
                </h2>
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

                <div className="mt-4 rounded-xl bg-gray-900 p-4 text-white">
                  <p className="text-xs text-gray-400">
                    DISTANCE
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {orders.distanceKm.toFixed(2)} km
                  </p>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="rounded-2xl border bg-white shadow-sm">
              <div className="border-b px-6 py-4">
                <h2 className="font-semibold text-gray-900">
                  Pricing
                </h2>
              </div>

              <div className="space-y-4 p-6">
                <PriceRow
                  label="Base Fee"
                  value={orders.pricingQuote.baseFee}
                />

                <PriceRow
                  label="Distance Fee"
                  value={orders.pricingQuote.distanceFee}
                />

                <PriceRow
                  label="Traffic Multiplier"
                  value={`×${orders.pricingQuote.trafficMultiplier}`}
                />

                <PriceRow
                  label="Weather Multiplier"
                  value={`×${orders.pricingQuote.weatherMultiplier}`}
                />

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      Total
                    </span>

                    <span className="text-xl font-bold">
                      ₹
                      {Number(
                        orders.pricingQuote.totalFee
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Current assignment */}
            {assignment && (
              <section className="rounded-2xl border bg-white shadow-sm">
                <div className="border-b px-6 py-4">
                  <h2 className="font-semibold text-gray-900">
                    Current Delivery Partner
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-3">
                  <Info
                    label="Name"
                    value={
                      assignment.deliveryPartner.user.name
                    }
                  />

                  <Info
                    label="Vehicle"
                    value={`${assignment.deliveryPartner.vehicleType} • ${assignment.deliveryPartner.vehicleNumber}`}
                  />

                  <Info
                    label="Email"
                    value={
                      assignment.deliveryPartner.user.email
                    }
                  />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment */}
            <section className="rounded-2xl border bg-white shadow-sm">
              <div className="border-b px-6 py-4">
                <h2 className="font-semibold text-gray-900">
                  {assignment
                    ? "Reassign Partner"
                    : "Assign Partner"}
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
                ) : !partners?.length ? (
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
                      {partners.map((partner) => (
                        <label
                          key={partner.id}
                          className={`block cursor-pointer rounded-xl border p-4 transition ${
                            selectedPartnerId === partner.id
                              ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              name="partner"
                              value={partner.id}
                              checked={
                                selectedPartnerId ===
                                partner.id
                              }
                              onChange={(event) =>
                                setSelectedPartnerId(
                                  event.target.value
                                )
                              }
                              className="mt-1 h-4 w-4 text-blue-600"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900">
                                {partner.user?.name ??
                                  partner.name}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {partner.user?.email ??
                                  partner.email}
                              </p>

                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                  {partner.vehicleType}
                                </span>

                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
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
                      disabled={
                        !selectedPartnerId ||
                        assignOrder.isPending
                      }
                      onClick={handleAssign}
                      className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {assignOrder.isPending
                        ? "Assigning..."
                        : assignment
                          ? "Reassign Partner"
                          : "Assign Partner"}
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

            {/* Conditions */}
            <section className="rounded-2xl border bg-white shadow-sm">
              <div className="border-b px-6 py-4">
                <h2 className="font-semibold text-gray-900">
                  Conditions
                </h2>
              </div>

              <div className="space-y-3 p-6">
                <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
                  <span className="text-sm text-amber-800">
                    Traffic
                  </span>

                  <span className="font-semibold text-amber-800">
                    {orders.pricingQuote.trafficCondition}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
                  <span className="text-sm text-blue-800">
                    Weather
                  </span>

                  <span className="font-semibold text-blue-800">
                    {orders.pricingQuote.weatherCondition}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

const Info = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
      {label}
    </p>

    <p className="mt-1 break-words text-sm font-medium text-gray-900">
      {value}
    </p>
  </div>
);

const PriceRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold text-gray-900">
      {value.startsWith("₹") || value.startsWith("×")
        ? value
        : `₹${Number(value).toFixed(2)}`}
    </span>
  </div>
);

const LocationCard = ({
  type,
  address,
  latitude,
  longitude,
  color,
}: {
  type: string;
  address: string;
  latitude: number;
  longitude: number;
  color: "blue" | "green";
}) => (
  <div
    className={`rounded-xl border p-5 ${
      color === "blue"
        ? "border-blue-100 bg-blue-50"
        : "border-emerald-100 bg-emerald-50"
    }`}
  >
    <p
      className={`text-xs font-semibold uppercase ${
        color === "blue"
          ? "text-blue-600"
          : "text-emerald-600"
      }`}
    >
      {type}
    </p>

    <p className="mt-2 font-semibold text-gray-900">
      {address}
    </p>

    <p className="mt-3 font-mono text-xs text-gray-500">
      {latitude}, {longitude}
    </p>
  </div>
);

export default AdminOrderDetailsPage;
