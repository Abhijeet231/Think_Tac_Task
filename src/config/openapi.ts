import "dotenv/config";
import { env } from "./env.js";

const API_KEY = env.OPENAI_API_key;

export const apikeyChecker = () => {
    if (!API_KEY) {
        console.error("Error: APi key is missing in the environment varibles.")
        process.exit(1)
    };
};

export const checkOpenAI = async () => {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: API_KEY });

    if (!client) {
        console.error("Error: Failed to initialize OpenAI client.");
        process.exit(1);
    }

    console.log("OpenAI client initialized successfully.");
    return client;
};
