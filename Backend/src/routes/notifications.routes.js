import express from "express";
import { getNotifications, markAsRead } from "../controllers/notifications.controllers.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.patch("/:id/read", protectRoute, markAsRead);

export default router;
