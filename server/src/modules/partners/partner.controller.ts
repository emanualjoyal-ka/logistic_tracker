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