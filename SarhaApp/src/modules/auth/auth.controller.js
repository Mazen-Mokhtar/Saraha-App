import { Router } from "express";
import * as authService from "./auth.service.js";
import { asyncHandler } from "../../utils/index.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as schema from "./auth.validation.js";
import { authorization } from "../../middleware/auth.middleware.js";

const router = Router();
router.post("/signup", validation(schema.signup), asyncHandler(authService.signup));
router.get("/confirmEmail/:authorization", validation(schema.confirmEmail), asyncHandler(authService.confirmEmailSigup));
router.post("/login", validation(schema.login), asyncHandler(authService.login));
router.post("/resetCode", validation(schema.sendResetCode), asyncHandler(authService.sendResetCode));
router.post("/verifyCode", authorization, validation(schema.verifyCode), asyncHandler(authService.verifyCode));
router.patch("/changePassword", authorization, validation(schema.changePassword), asyncHandler(authService.changePassword))
export default router;