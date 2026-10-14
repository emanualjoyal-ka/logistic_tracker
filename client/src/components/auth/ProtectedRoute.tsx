"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hook/hooks";
import { Role } from "@/features/auth/authTypes";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export default function ProtectedRoute({children,allowedRoles}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthChecked) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized");
    }
  }, [isAuthChecked,user,allowedRoles,router]);
  if (!isAuthChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-15 w-15 rounded-full border-r-1 border-l-1 border-b-2 animate-spin border-white"/>
      </div>
    );
  }
  if (!user) {
    return null;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }
  return <>{children}</>;
}