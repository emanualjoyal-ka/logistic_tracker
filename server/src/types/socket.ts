import type { UserRole } from "../generated/prisma/enums.js";

export interface SocketUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}