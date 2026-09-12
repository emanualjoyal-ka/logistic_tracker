import type { Request, Response } from "express";
import { orderServices } from "./order.service.js";
import { sendResponse } from "../../utils/ApiResponse.js";


export const createOrder=async(req: Request,res: Response)=> {
    const customerId = req.user!.userId;
    const order=await orderServices.createOrder(customerId,req.body)
    return sendResponse(res,{
        statusCode:201,
        message:"Order created successfully",
        data:order
    })
}

export const getOrders=async(req: Request,res: Response)=> {
    const customerId = req.user!.userId;
    const page=Number(req.query.page) || 1;
    const limit=Number(req.query.limit) || 5;
    const orders = await orderServices.getCustomerOrders(customerId,page,limit)
    return sendResponse(res,{
        statusCode:200,
        data:orders
    })
}

export const getOrder=async(req: Request,res: Response)=> {
    const customerId = req.user!.userId;
    const { id } = req.params;
    const order = await orderServices.getCustomerOrder(customerId,id);
    return sendResponse(res,{
        statusCode:200,
        data:order
    })
}

export const cancelOrder=async(req: Request,res: Response)=> {
    const customerId = req.user!.userId;
    const { id } = req.params;
    const order = await orderServices.cancelCustomerOrder(customerId,id);
    return sendResponse(res,{
        statusCode:200,
        message: "Order cancelled successfully",
        data:order
    })
}