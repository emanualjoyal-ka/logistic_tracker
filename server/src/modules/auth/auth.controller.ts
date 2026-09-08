import type { Request, Response } from "express";
import { authServices } from "./auth.service.js";
import { sendResponse } from "../../utils/ApiResponse.js";
import { refreshCookieOptions } from "../../utils/cookie.js";


export const userRegister=async(req: Request,res: Response)=> {
    const user = await authServices.registerUser(req.body)
    return sendResponse(res,{
        statusCode:201,
        message:"User created successfully",
        data:user
    })
}


export const userLogin=async(req: Request,res: Response)=> {
   const {refreshToken,user,accessToken}=await authServices.loginUser(req.body)
   res.cookie("refreshToken",refreshToken,refreshCookieOptions)
   return sendResponse(res,{
        statusCode:200,
        message:"Login successfull",
        data:{
            user,
            accessToken
        }
    })
}


export const refreshAccessToken=async(req: Request,res: Response)=> {
  const refreshtoken=req.cookies?.refreshToken;
  const {refreshToken,...data}=await authServices.refreshAccessToken(refreshtoken)
  res.cookie("refreshToken",refreshToken,refreshCookieOptions);
  return sendResponse(res,{
    statusCode:200,
    data:data
  })
}

export const logout=async(req:Request,res:Response)=>{
    const refreshToken=req.cookies?.refreshToken;
    await authServices.logoutUser(refreshToken)
    res.clearCookie("refreshToken")
    return sendResponse(res,{
        statusCode:200,
        message:"Logged out successfully"
    })
}


export const getUser=async(req:Request,res:Response)=>{
    const id=req.user!.userId;
    const user=await authServices.currentUser(id)
    return sendResponse(res,{
        statusCode:200,
        data:user
    })
}