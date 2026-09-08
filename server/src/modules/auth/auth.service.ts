import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";
import type { AuthResponseDTO, LoginInput, LoginResponseDTO, RefreshTokenResponseDTO, RegisterInput } from "./auth.types.js";
import { authRepository } from "./auth.repository.js";
import ApiError from "../../utils/ApiError.js";
import { v4 as uuidv4 } from "uuid";

export const authServices={
    registerUser:async (input: RegisterInput):Promise<AuthResponseDTO>=> {
    const existingUser = await authRepository.findByEmail(input.email)

    if (existingUser) {
        throw new ApiError("User with this email already exists",409);
    }

    const hashedPasswd = await bcrypt.hash(input.passwordHash, 10);

    const userData = {...input,passwordHash:hashedPasswd}
    
    const user=await authRepository.registerUser(userData)

    return {
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
        createdAt:user.createdAt
    }
    },

    loginUser:async(input:LoginInput):Promise<LoginResponseDTO & {refreshToken:string}>=>{
        
    const user = await authRepository.findByEmail(input.email)

    if (!user) {
        throw new ApiError("Invalid email or password",404);
    }

    const passwordMatches = await bcrypt.compare(
        input.password,
        user.passwordHash
    );

    if (!passwordMatches) {
        throw new ApiError("Invalid email or password",404);
    }

    const token_id=uuidv4();

    const accessToken = generateAccessToken({
        userId:user.id,
        role:user.role,
        token_id:token_id
    });
    const refreshToken = generateRefreshToken({userId:user.id,token_id:token_id});
    const hashedRefreshToken=await bcrypt.hash(refreshToken,10)

    await authRepository.createRefreshToken({
            user_id:user.id,
            token_hash:hashedRefreshToken,
            token_id:token_id,
            expires_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    })

    return {
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        },
        accessToken,
        refreshToken
    };
    },

    refreshAccessToken:async(refreshToken?:string):Promise<RefreshTokenResponseDTO & {refreshToken:string}>=>{
        if(!refreshToken){
            throw new ApiError("No refresh token provided",401)
        }
        const payload = verifyRefreshToken(refreshToken);

        const user = await authRepository.findById(payload.userId)

        if (!user) {
            throw new ApiError("User not found",403);
        }

        const tokenRecord=await authRepository.findByTokenId(payload.token_id)
        if(!tokenRecord ||tokenRecord.is_revoked || tokenRecord.expires_at < new Date()){
            throw new ApiError("Session has expired or has been revoked",401)
        }
        const is_token=await bcrypt.compare(refreshToken,tokenRecord.token_hash)
        if(!is_token){
            throw new ApiError("Invalid refresh token",401)
        }

        const newTokenId=uuidv4()
        const newAccessToken=generateAccessToken({userId:user.id.toString(),token_id:newTokenId,role:user.role})
        const newRefreshToken=generateRefreshToken({userId:user.id.toString(),token_id:newTokenId});
        const hashedRefreshToken=await bcrypt.hash(newRefreshToken,10);
        await authRepository.rotateRefreshToken(payload.token_id,{
            user_id:user.id,
            token_hash:hashedRefreshToken,
            token_id:newTokenId,
            expires_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        })

        return {
            accessToken:newAccessToken,
            refreshToken:newRefreshToken,
            email:user.email,
            name:user.name
        };
    },

    logoutUser:async(token?:string):Promise<void>=>{
        if(!token){
            throw new ApiError("No refresh token provided",400)
        }
        const payload=verifyRefreshToken(token);
        const updated=await authRepository.revokeToken(payload.token_id)
        if(!updated){
            throw new ApiError("Session not found",404)
        }
    },

    currentUser:async(userId:string):Promise<AuthResponseDTO>=>{
        const user=await authRepository.findById(userId)
        if(!user){
            throw new ApiError("user not found",404)
        }
        return {
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            createdAt:user.createdAt
        }
    }
}

