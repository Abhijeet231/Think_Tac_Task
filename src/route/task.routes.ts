import { Router } from "express";
import { createTask, getAllTasks, getTaskSummary } from "../controller/task.controller.js"
import { summaryLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/summary",summaryLimiter, getTaskSummary);

export default router;