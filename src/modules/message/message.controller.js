import { Router } from "express";
import { authorization } from "../../middleware/auth.middleware.js";
import * as schema from "./message.validation.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as messageService from "./message.service.js";
import { asyncHandler } from "../../utils/index.js";
const router = Router();
router.put("/:resverId",validation(schema.putMessage), asyncHandler(messageService.putMessage))
router.get("/user-messages", asyncHandler(authorization), validation(schema.userMessages), asyncHandler(messageService.userMessages))
router.delete("/delete-message/:id", asyncHandler(authorization), validation(schema.deleteMessage), asyncHandler(messageService.deleteMessage))
router.patch("/update-message/:id", asyncHandler(authorization), validation(schema.updateMessage), asyncHandler(messageService.updateMessage))
router.patch("/markRead/:id", asyncHandler(authorization), validation(schema.markAsRead), asyncHandler(messageService.markAsRead))
router.get("/unRead-message", asyncHandler(authorization), validation(schema.unReadMessages), asyncHandler(messageService.unReadMessages))
router.get("/search-message", asyncHandler(authorization), validation(schema.searchMessages), asyncHandler(messageService.searchMessages))
router.get("/count-message", asyncHandler(authorization), validation(schema.countUnReadMessage), asyncHandler(messageService.countUnReadMessage))
export default router