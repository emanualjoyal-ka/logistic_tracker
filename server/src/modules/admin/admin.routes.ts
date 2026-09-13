import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { assignOrderController, getAvailablePartnersController } from "./admin.controller.js";


const router = Router();


router.get("/partners/available",authenticate,authorize(UserRole.ADMIN),getAvailablePartnersController);
router.post("/orders/:id/assign",authenticate,authorize(UserRole.ADMIN),assignOrderController);
/* RACE CONDITION SOlUTIONS:
Database row locking
Optimistic concurrency
Atomic conditional updates
Serializable transactions
Queue-based assignment
*/

export default router;