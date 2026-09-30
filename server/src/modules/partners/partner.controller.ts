import type {Request,Response} from "express";
import { partnerServices } from "./partner.service.js";
import { sendResponse } from "../../utils/ApiResponse.js";


export const acceptOrderController=async(req: Request,res: Response)=> {
    const userId = req.user!.userId;
    const { id } = req.params;
    const order = await partnerServices.acceptOrder(userId,id);
    return sendResponse(res,{
        statusCode:200,
        data:order
    })
}

export const pickupOrderController=async(req: Request,res: Response)=> {
    const userId = req.user!.userId;
    const { id } = req.params;
    const order = await partnerServices.pickupOrder(userId,id);
    return sendResponse(res,{
        statusCode:200,
        data:order
    })
}

export const startDeliveryController=async(req: Request,res: Response)=> {
    const userId = req.user!.userId;
    const { id } = req.params;
    const order = await partnerServices.startDelivery(userId,id);
    return sendResponse(res,{
        statusCode:200,
        data:order
    })
}

export const deliverOrderController=async(req: Request,res: Response)=> {
    const userId = req.user!.userId;
    const { id } = req.params;
    const order = await partnerServices.deliverOrder(userId,id);
    return sendResponse(res,{
        statusCode:200,
        data:order
    })
}

export const getPartnerProfile=async(req:Request,res:Response)=>{
    const id=req.user!.userId;
    const user=await partnerServices.partnerProfile(id);
    return sendResponse(res,{
        statusCode:200,
        data:user
    })
}

export const getOrders=async(req: Request,res: Response)=> {
    const partnerId = req.user!.userId;
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 5;
    const orders = await partnerServices.getAssignedOrders(partnerId,page,limit)
    return sendResponse(res,{
        statusCode:200,
        data:orders
    })
}

export const getOrder=async(req: Request,res: Response)=> {
    const partnerId = req.user!.userId;
    const { id } = req.params;
    const order = await partnerServices.getAssignedOrder(partnerId,id);
    return sendResponse(res,{
        statusCode:200,
        data:order
    })
}