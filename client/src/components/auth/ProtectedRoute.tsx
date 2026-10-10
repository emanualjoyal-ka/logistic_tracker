// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/store/hook/hooks";
// import { useAuthCheck } from "@/hooks/use-auth-check";

// export default function ProtectedRoute({children}: {children: React.ReactNode;}) {
//   const router = useRouter();
//   const { isAuthChecked } = useAuthCheck();
//   const { user } = useAppSelector((state) => state.auth);
//   useEffect(() => {
//     if (isAuthChecked && !user) {
//       router.replace("/login");
//     }
//   }, [isAuthChecked, user, router]);
//   if (!isAuthChecked) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         Checking authentication...
//       </div>
//     );
//   }
//   if (!user) {
//     return null;
//   }
//   return <>{children}</>;
// }

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// import { useAppSelector } from "@/store/hook/hooks";
// import { useAuthCheck } from "@/hooks/use-auth-check";

// type Role = "ADMIN" | "PARTNER" | "CUSTOMER";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   allowedRoles?: Role[];
// }

// export default function ProtectedRoute({
//   children,
//   allowedRoles,
// }: ProtectedRouteProps) {
//   const router = useRouter();

//   const { isAuthChecked } = useAuthCheck();

//   const { user } = useAppSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (!isAuthChecked) return;

//     if (!user) {
//       router.replace("/login");
//       return;
//     }

//     if (
//       allowedRoles &&
//       !allowedRoles.includes(user.role)
//     ) {
//       router.replace("/unauthorized");
//     }
//   }, [
//     isAuthChecked,
//     user,
//     allowedRoles,
//     router,
//   ]);

//   if (!isAuthChecked) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         Checking authentication...
//       </div>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   if (
//     allowedRoles &&
//     !allowedRoles.includes(user.role)
//   ) {
//     return null;
//   }

//   return <>{children}</>;
// }




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
        Checking authentication...
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