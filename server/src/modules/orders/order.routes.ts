import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import {createOrder,getOrders,getOrder, cancelOrder} from "./order.controller.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { getOrderTrackingHistory } from "../tracking/tracking.controller.js";

const router = Router();

router.post("/",authenticate,authorize(UserRole.CUSTOMER),createOrder);
router.get("/",authenticate,authorize(UserRole.CUSTOMER),getOrders);
router.get("/:id",authenticate,authorize(UserRole.CUSTOMER),getOrder);
router.post("/:id/cancel",authenticate,authorize(UserRole.CUSTOMER),cancelOrder);
router.get("/:id/tracking/history",authenticate,authorize(UserRole.CUSTOMER),getOrderTrackingHistory);

export default router;