import { UserRole } from "@/types/auth";

export const ROLE_ROUTES: Record<UserRole, string> = {
  ADMIN: "/admin/dashboard",
  CUSTOMER: "/customer/orders",
  DELIVERY_PARTNER: "/partner/dashboard",
};
