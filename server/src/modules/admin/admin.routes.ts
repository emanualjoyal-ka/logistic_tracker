import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { assignOrderController, dashboardController, getAvailablePartnersController, orderController, ordersController, partnersController } from "./admin.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { assignOrderSchema } from "./admin.validation.js";


const router = Router();


router.get("/partners/available",authenticate,authorize(UserRole.ADMIN),getAvailablePartnersController);
router.post("/orders/:id/assign",authenticate,authorize(UserRole.ADMIN),validate(assignOrderSchema),assignOrderController);
/* RACE CONDITION SOlUTIONS:
Database row locking
Optimistic concurrency
Atomic conditional updates
Serializable transactions
Queue-based assignment
*/
router.get("/dashboard",authenticate,authorize(UserRole.ADMIN),dashboardController);
router.get("/orders",authenticate,authorize(UserRole.ADMIN),ordersController);
router.get("/orders/:id",authenticate,authorize(UserRole.ADMIN),orderController);
router.get("/partners",authenticate,authorize(UserRole.ADMIN),partnersController);

export default router;