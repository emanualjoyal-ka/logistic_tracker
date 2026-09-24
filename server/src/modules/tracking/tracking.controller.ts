import type {Request,Response} from "express";
import { trackingServices } from "./tracking.service.js";
import { sendResponse } from "../../utils/ApiResponse.js";


export const updateLocationController=async(req: Request,res: Response)=> {
    const userId = req.user!.userId;
    const result = await trackingServices.updatePartnerLocation(userId,req.body);
    return sendResponse(res,{
            statusCode:200,
            data:result
    })
}

export const recordTrackingController=async(req: Request,res: Response)=> {
    const userId = req.user!.userId;
    const { id } = req.params;
    const result = await trackingServices.recordTrackingPoint(id,userId,req.body.latitude,req.body.longitude);
    return sendResponse(res,{
            statusCode:201,
            data:result
    })
}

export const getOrderTrackingHistory=async(req: Request,res: Response)=> {
    const customerId = req.user!.userId;
    const {id}=req.params;
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 5;
    const result = await trackingServices.getOrderTrackingHistory(customerId,id,page,limit)
    return sendResponse(res,{
        statusCode:200,
        data:result
    })
}