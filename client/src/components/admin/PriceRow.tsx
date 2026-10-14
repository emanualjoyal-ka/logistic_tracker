const PriceRow = ({label,value}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold">
      {value.startsWith("₹") || value.startsWith("×")
        ? value
        : `₹${Number(value).toFixed(2)}`}
    </span>
  </div>
);

export default PriceRow;