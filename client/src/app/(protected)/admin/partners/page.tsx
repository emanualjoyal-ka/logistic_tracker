"use client";

import { useAdminPartners } from "@/hooks/use-admin";

const AdminPartnersPage = () => {
  const {
    data: partners,
    isLoading,
    isError,
  } = useAdminPartners();

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
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Delivery Partners
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage all delivery partners.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {partners?.map((partner) => {
            const user = partner.user;

            return (
              <div
                key={partner.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                      {(user?.name ?? partner.user.name)
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h2 className="font-semibold text-gray-900">
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
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-400">
                      Vehicle
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {partner.vehicleType}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-400">
                      Number
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {partner.vehicleNumber}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-gray-400">
                    Partner ID
                  </p>

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
