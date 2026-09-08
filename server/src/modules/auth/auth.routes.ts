import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { getUser, logout, refreshAccessToken, userLogin, userRegister } from "./auth.controller.js";

const router = Router();

router.post("/register", validate(registerSchema),userRegister);
router.post("/login", validate(loginSchema),userLogin);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

router.get("/me", authenticate, getUser);

export default router;