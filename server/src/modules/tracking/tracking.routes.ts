import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { recordTrackingController, updateLocationController } from "./tracking.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { updateLocationSchema } from "./tracking.validation.js";


const router = Router();

router.patch("/location",authenticate,authorize(UserRole.DELIVERY_PARTNER),validate(updateLocationSchema),updateLocationController);
router.post("/orders/:id",authenticate,authorize(UserRole.DELIVERY_PARTNER),validate(updateLocationSchema),recordTrackingController);


export default router;