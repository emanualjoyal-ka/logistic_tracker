import prisma from "../../lib/prisma.js"
import type { CreateUserData, RefreshTokenCreateDTO } from "./auth.types.js";

const userTable=prisma.user;
const refreshTokenTable=prisma.refreshToken;

export const authRepository={
    registerUser:(data:CreateUserData)=>{
        return userTable.create({
        data:data,
        select: {
        id: true,
        name: true,
        email: true,
        role: true,
        },
    });
    },

    findByEmail:(email:string)=>{
        return userTable.findUnique({where:{email}})
    },

    createRefreshToken:(data:RefreshTokenCreateDTO)=>{
        return refreshTokenTable.create({data})
    },

    findById: (id: string) => {
        return userTable.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    },


    findByTokenId:(tokenId:string)=>{
        return refreshTokenTable.findUnique({where:{token_id:tokenId}})
    },

    rotateRefreshToken:async(tokenId:string,data:RefreshTokenCreateDTO)=>{
        return prisma.$transaction(async(tx)=>{
            await tx.refreshToken.update({
                where:{token_id:tokenId},
                data:{is_revoked:true}
            })
            await tx.refreshToken.create({data})
        })
    },

    revokeToken:(tokenId:string)=>{
        return refreshTokenTable.update({
            where:{token_id:tokenId},
            data:{is_revoked:true}
        })
    },
}