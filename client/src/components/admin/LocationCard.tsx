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
  <div className="rounded-xl border p-5 border-white/20 bg-white/20">
    <p className={`text-xs font-semibold uppercase ${color === "blue" ? "text-blue-600" : "text-emerald-600"}`}>
      {type}
    </p>
    <p className="mt-2 font-semibold capitalize">
      {address}
    </p>
    <p className="mt-3 font-mono text-xs">
      {latitude}, {longitude}
    </p>
  </div>
);

export default LocationCard;