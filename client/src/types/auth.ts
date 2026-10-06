export type UserRole =
  | "CUSTOMER"
  | "DELIVERY_PARTNER"
  | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Login{
    email:string;
    password:string;
}

export interface Signup{
    name:string;
    email:string;
    password:string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
}