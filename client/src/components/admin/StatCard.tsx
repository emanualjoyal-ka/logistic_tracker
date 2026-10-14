const Stat=({label,value}: {label: string;value: number;})=> {
  return (
    <div className="bg-black border border-white/20 rounded-md p-10">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

export default Stat