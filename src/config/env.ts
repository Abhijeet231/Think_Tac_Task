import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
    PORT: z.string().default("5000"),
    FIREBASE_PROJECT_ID: z.string(),
    FIRESTORE_EMULATOR_HOST: z.string().optional(),
    OPENAI_API_key: z.string().optional()
})

export const env = envSchema.parse(process.env)