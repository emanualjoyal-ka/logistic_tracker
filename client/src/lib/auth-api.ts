import { api } from "./api";
import { AuthUser } from "@/types/auth";

/*
 * Get the currently authenticated user.
 *
 * The browser automatically sends
 * the HTTP-only accessToken cookie.
 */
export async function getMe(): Promise<AuthUser> {
  const response = await api.get("/auth/me");
  return response.data.data;
}

/*
 * Login user.
 */
export async function login(
  email: string,
  password: string
): Promise<AuthUser> {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  /*
   * The backend sets the HTTP-only cookies.
   *
   * We don't manually store the JWT.
   */
  return response.data.data;
}

/*
 * Register a new customer.
 */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthUser> {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data.data;
}

/*
 * Logout the current user.
 */
export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}