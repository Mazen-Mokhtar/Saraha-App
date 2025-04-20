import { Router } from "express";
import * as userServices from "./user.service.js"
import { asyncHandler } from "../../utils/index.js";
import { authorization } from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as schema from "./user.validation.js";
const router = Router();
router.get("/profile", authorization, validation(schema.getProfile), asyncHandler(userServices.getProfile))
router.patch("/update", authorization, validation(schema.updateProfile), asyncHandler(userServices.updateProfile))
router.delete("/delete", authorization, validation(schema.getProfile), asyncHandler(userServices.deleteAccount))
router.get("/getAllUser", authorization, validation(schema.getProfile), asyncHandler(userServices.getAllUser))
router.get("/getUser/:id", authorization, asyncHandler(userServices.getProfileById))
export default router;