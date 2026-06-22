import { checkOpenAI } from "../../config/openapi.js";

export const summarizeTasks = async (tasks: { title: string; description?: string | null }[]) => {
    const client = await checkOpenAI();

    const taskList = tasks
        .map((t, i) => `${i + 1}. ${t.title}${t.description ? `: ${t.description}` : ""}`)
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