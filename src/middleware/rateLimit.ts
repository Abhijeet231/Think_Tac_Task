import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: {error: "You hit the global rate limit. 15 minutes cooldown."}
})


export const summaryLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 7,
    message: {error: "Token usages are limited to 7 times per hour. Please try again later."}
})