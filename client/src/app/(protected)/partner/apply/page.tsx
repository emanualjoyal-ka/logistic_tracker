"use client";

import { useState } from "react";

const PartnerApplicationPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      vehicleType: formData.get("vehicleType"),
      vehicleNumber: formData.get("vehicleNumber"),
      licenseNumber: formData.get("licenseNumber"),
    };

    setLoading(true);

    try {
      // await submitPartnerApplication(data);

      console.log(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Become a Delivery Partner
          </h1>

          <p className="mt-2 text-gray-500">
            Submit your details and our team will review your
            application.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <h2 className="font-semibold text-gray-900">
              Personal Information
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                name="name"
                label="Full Name"
                required
              />

              <Input
                name="email"
                type="email"
                label="Email"
                required
              />

              <Input
                name="phone"
                label="Phone Number"
                required
              />

              <Input
                name="address"
                label="Address"
                required
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-semibold text-gray-900">
              Vehicle Information
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Vehicle Type
                </label>

                <select
                  name="vehicleType"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500"
                >
                  <option value="">Select vehicle</option>
                  <option value="BIKE">Bike</option>
                  <option value="CAR">Car</option>
                  <option value="VAN">Van</option>
                </select>
              </div>

              <Input
                name="vehicleNumber"
                label="Vehicle Number"
                required
              />

              <Input
                name="licenseNumber"
                label="Driving License Number"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-300"
          >
            {loading
              ? "Submitting..."
              : "Submit Application"}
          </button>

          <p className="text-center text-xs text-gray-400">
            Your application will be reviewed by our admin team.
          </p>
        </form>
      </div>
    </main>
  );
};

const Input = ({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) => (
  <div>
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>

    <input
      name={name}
      type={type}
      required={required}
      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  </div>
);

export default PartnerApplicationPage;
