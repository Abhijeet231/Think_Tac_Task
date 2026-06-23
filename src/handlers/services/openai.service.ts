import { checkOpenAI } from "../../config/openapi.js";

const MAX_TASK_FOR_SUMMARY = 50;

export const summarizeTasks = async (tasks: { title: string; description?: string | null }[]) => {

    const limitedTasks = tasks.slice(0, MAX_TASK_FOR_SUMMARY)

    if(limitedTasks.length === 0) {
        return "No tasks yet."
    }

    const client = await checkOpenAI();

    const taskList = limitedTasks
        .map((task, idx) => `${idx + 1}. ${task.title}${task.description ? `: ${task.description}` : ""}`)
        .join("\n");

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: `Summarize these tasks in one plain-English paragraph:\n${taskList}`
            }
        ]
    });

    const summary = response.choices[0]?.message?.content;

    if (!summary) {
        throw new Error("OpenAI returned an empty response.")
    }


    return summary;
};