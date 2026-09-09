export interface RegisterInput{
  name: string;
  email: string;
  passwordHash: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponseDTO{
    id: string;
    name:string;
    email:string;
    role: string;
    createdAt:Date;
}

export interface LoginResponseDTO{
    user:{
        id:string;
        name:string;
        email:string;
        role:string;
    }
    accessToken:string;
}

export type RefreshTokenCreateDTO={
    user_id:string;
    token_hash:string;
    expires_at:Date;
    token_id:string;
}

export type RefreshTokenResponseDTO ={
    email:string;
    name:string;
    accessToken:string;
}

