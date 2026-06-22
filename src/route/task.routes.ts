import { Router } from "express";
import { createTask, getAllTasks, getTaskSummary } from "../controller/task.controller.js"

const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/summary", getTaskSummary);

export default router;