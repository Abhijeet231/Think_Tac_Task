import { Router } from "express";
import { db } from "../db/firebase.js"
import { type Request, type Response } from "express";
import { createTaskSchema } from "../handlers/schemas/task.schema.js"


const router = Router();

// create a task
router.post("/", async (req: Request, res: Response) => {

    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({
        error: parsed.error.issues.map(issue => issue.message).join(", ")
    })

    const { title, description } = parsed.data
    const doc = await db.collection("task").add({
        title,
        description: description ?? null,
        createdAt: Date.now(),

    });

    res.status(201).json({ id: doc.id })

})

// get all tasks 
router.get("/", async (req: Request, res: Response) => {

    const data = await db.collection("task").orderBy("createdAt").get();

    const tasks = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    res.json(tasks)

})

export default router;