const Info = ({label,value,className}: {label: string; value: React.ReactNode;className?:string;}) => (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
      {label}
    </p>
    <p className={`mt-1 break-words text-sm font-medium ${className}`}>
      {value}
    </p>
  </div>
);

export default Info;