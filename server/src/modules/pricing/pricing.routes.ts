import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { UserRole } from "../../generated/prisma/enums.js";
import { getPricingQuote } from "./pricing.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { pricingQuoteSchema } from "./pricing.validation.js";

const router = Router();

router.post("/quote",authenticate,authorize(UserRole.CUSTOMER),validate(pricingQuoteSchema),getPricingQuote);

export default router;