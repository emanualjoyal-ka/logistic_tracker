import { MouseEventHandler } from "react";


type Props={
  title:string;
  onClick?:MouseEventHandler<HTMLButtonElement>;
  className?:string;
  padding?:string;
  type?:"button" | "submit" | "reset";
  disabled?:boolean;
}

export const Button1 = ({title,onClick,className,padding}:Props) => {
  return (
    <button onClick={onClick} className={`${className} ${padding} bg-black hover:bg-[#1F1F1F] cursor-pointer transition duration-300 font-medium  border-[0.5px] border-white/20`}>{title}</button>
  )
}

export const Button2 = ({title,onClick,className,type,disabled}:Props) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${className} bg-white hover:bg-[#CCCCCC] text-black cursor-pointer transition duration-300 font-medium border-[0.5px] border-white/20`}>{title}</button>
  )
}