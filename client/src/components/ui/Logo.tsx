"use client"
import { Lobster_Two } from "next/font/google";
import { useRouter } from "next/navigation";

const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: ["400"],
});


const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
  xl: "text-4xl",
};

type LogoProps = {
  size?: keyof typeof sizeMap;
};

export const Logo=({size="lg"}:LogoProps)=> {
  const router=useRouter()
  return (
    <div onClick={()=>router.push("/")} className={`${lobster.className} ${sizeMap[size]} cursor-pointer font-bold`}>
      Logistic Care
    </div>
  );
}