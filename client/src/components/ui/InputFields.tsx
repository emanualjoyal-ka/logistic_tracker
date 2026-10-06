import { UseFormRegisterReturn } from "react-hook-form";

type InputProps={
    type?:string;
    className?:string,
    placeholder?:string;
    registration:UseFormRegisterReturn;
}

export const InputField = ({type="text",className,placeholder,registration}:InputProps) => {
  return (
    <>
          <input type={type} {...registration} placeholder={placeholder} className={`transition duration-200 outline-none px-3 border border-white/10 rounded-lg w-full h-12 bg-[#0A0A0A] ${className}`}/>
    </>
  )
}
