import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: {error: "You hit the global rate limit. 15 minutes cooldown."}
})


export const summaryLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 7,
    message: {error: "You've burned enough of my tokens for today. Go touch some grass."}
})