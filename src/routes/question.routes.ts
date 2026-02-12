import { Router } from "express";
import { getQuestions, getQuestionById, submitAnswers } from "../controllers/question.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticateToken, getQuestions);
router.get("/:id", authenticateToken, getQuestionById);
router.post("/submit", authenticateToken, submitAnswers);

export default router;
