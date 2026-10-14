"use client";
import { useAdminPartners } from "@/hooks/use-admin";

const AdminPartnersPage = () => {
  const {data: partners,isLoading,isError} = useAdminPartners();
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        Loading partners...
      </main>
    );
  }
  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          Failed to load partners.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto">
          <p className="text-sm mb-6">View and manage all delivery partners.</p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {partners?.map((partner) => {
            const user = partner.user;
            return (
              <div key={partner.id} className="rounded-2xl border border-white/20 bg-black p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                      {(user?.name ?? partner.user.name).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-semibold">
                        {user?.name ?? partner.user.name}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {user?.email ?? partner.user.email}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Active
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/20 p-3">
                    <p className="text-xs">Vehicle</p>
                    <p className="mt-1 text-sm font-semibold">
                      {partner.vehicleType}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/20 p-3">
                    <p className="text-xs">Number</p>
                    <p className="mt-1 text-sm font-semibold">{partner.vehicleNumber}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-400">Partner ID</p>
                  <p className="mt-1 break-all font-mono text-xs text-gray-600">
                    {partner.id}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {!partners?.length && (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <p className="font-semibold text-gray-900">
              No partners found
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPartnersPage;
