import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { acceptOrderController, deliverOrderController, pickupOrderController, startDeliveryController } from "./partner.controller.js";


const router = Router();


router.post("/orders/:id/accept",authenticate,authorize(UserRole.DELIVERY_PARTNER),acceptOrderController);
router.post("/orders/:id/pickup",authenticate,authorize(UserRole.DELIVERY_PARTNER),pickupOrderController);
router.post("/orders/:id/start",authenticate,authorize(UserRole.DELIVERY_PARTNER),startDeliveryController);
router.post("/orders/:id/deliver",authenticate,authorize(UserRole.DELIVERY_PARTNER),deliverOrderController);

export default router;