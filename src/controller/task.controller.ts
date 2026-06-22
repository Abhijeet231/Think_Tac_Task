import { type Request, type Response } from "express";
import { db } from "../db/firebase.js";
import { createTaskSchema } from "../handlers/schemas/task.schema.js";
import { summarizeTasks } from "../handlers/services/openai.service.js";

// Create task
export const createTask = async (req: Request, res: Response) => {
    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({
        error: parsed.error.issues.map(issue => issue.message).join(", ")
    });

    const { title, description } = parsed.data;
    const doc = await db.collection("task").add({
        title,
        description: description ?? null,
        createdAt: Date.now(),
    });

    res.status(201).json({ id: doc.id });
};

// Get all task
export const getAllTasks = async (req: Request, res: Response) => {
    const data = await db.collection("task").orderBy("createdAt").get();
    const tasks = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
};


// Get summary of tasks
export const getTaskSummary = async (req: Request, res: Response) => {
    try {
        const data = await db.collection("task").get();
        const tasks = data.docs.map(doc => doc.data() as { title: string; description?: string });

        const summary = await summarizeTasks(tasks);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate summary." });
    }
};