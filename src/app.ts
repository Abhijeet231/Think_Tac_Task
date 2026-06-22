import express from "express";
import taksRouter from "./route/task.routes.js"

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/tasks", taksRouter)

export default app;