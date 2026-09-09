import { Router } from "express";

import { UserRole } from "../../generated/prisma/enums.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = Router();

/*
 * Only ADMIN can access this route.
 */
router.get(
  "/admin-test",
  authenticate,
  authorize(UserRole.ADMIN),
  (_req, res) => {
    return res.json({
      success: true,
      message: "Welcome Admin!",
    });
  }
);

/*
 * Only CUSTOMER can access this route.
 */
router.get(
  "/customer-test",
  authenticate,
  authorize(UserRole.CUSTOMER),
  (_req, res) => {
    return res.json({
      success: true,
      message: "Welcome Customer!",
    });
  }
);

/*
 * Only DELIVERY_PARTNER can access this route.
 */
router.get(
  "/partner-test",
  authenticate,
  authorize(UserRole.DELIVERY_PARTNER),
  (_req, res) => {
    return res.json({
      success: true,
      message: "Welcome Delivery Partner!",
    });
  }
);

export default router;