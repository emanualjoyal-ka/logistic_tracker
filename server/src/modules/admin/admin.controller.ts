import type {Request,Response} from "express";
import { sendResponse } from "../../utils/ApiResponse.js";
import { adminServices } from "./admin.service.js";


export const getAvailablePartnersController=async(req: Request,res: Response)=> {
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 5;
    const partners = await adminServices.getAvailablePartners(page,limit);
    return sendResponse(res,{
            statusCode:200,
            data:partners
    })
}

export const assignOrderController=async(req: Request,res: Response)=> {
    const { id } = req.params;
    const {partnerProfileId} = req.body;
    const result = await adminServices.assignOrderToPartner(id,partnerProfileId);
    return sendResponse(res,{
            statusCode:200,
            data:result
    })
}