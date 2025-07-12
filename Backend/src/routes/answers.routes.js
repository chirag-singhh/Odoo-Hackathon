import express from "express";
import {
  postAnswer,
  getAnswers,
  voteAnswer,
  acceptAnswer,
} from "../controllers/answers.controllers.js";
import {protectRoute} from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/:questionId", protectRoute, postAnswer);
router.get("/:questionId", getAnswers);
router.put("/:id/vote", protectRoute, voteAnswer);
router.patch("/:id/accept", protectRoute, acceptAnswer);

export default router;
