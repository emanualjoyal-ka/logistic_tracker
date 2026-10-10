export type Role = "ADMIN" | "DELIVERY_PARTNER" | "CUSTOMER";


export interface User { 
  id: string
  name: string
  email: string
  role:Role
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthChecked: boolean
}