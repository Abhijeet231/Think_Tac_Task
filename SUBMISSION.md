# Written Explanation, Product Critique & Reflection

---

## Part 2: Written Explanation

### Architecture Choices

- I used a structured folder layout to keep clear separation between each layer - routes, controllers, services, and db.
- This keeps each file focused on one responsibility and makes the code easier to maintain.
- I also kept the AI logic separate in its own service, so if I switch from OpenAI to another LLM later, I won't have to touch other part of the code at all.
- I also typed and validated the environment variables using Zod, for extra type safety and easier debugging if something is missing, as it provides autocomplete.

**What I'd improve if this was going to production**

I would explore Firestore security rules more, add better guardrails around the LLM layer to avoid token/cost abuse, and focus more on edge cases and error handling in general - right now it's basic.

### LLM Integration

I call OpenAI directly through their SDK, inside a separate service file.

- The summary endpoint builds a simple numbered list of task titles and descriptions, sends it as one prompt to `gpt-4o-mini`, and returns the plain text response.

**Failure modes I handled:** missing API key, and empty/unexpected response from OpenAI (throws an explicit error instead of returning garbage). I also added rate limiting specifically on the summary route (7 requests/hour) since it's the most expensive endpoint to abuse.

**Failure modes I skipped:** no retry logic if OpenAI times out or rate-limits me, no handling for very large task lists that could go over token limits, and no caching - every call re-summarizes from scratch even if nothing changed.

### One Thing I'd Do Differently

If I had another 2 hours, I would focus more on the LLM layer - right now it always calls `gpt-4o-mini` directly. I'd want to test a cheaper/faster model first as a baseline, then compare output quality against something more powerful, to actually justify the model choice instead of just picking one. I'd also add basic caching so repeated summary calls without new tasks don't waste API cost.

---

## Part 3: Product Critique

I reviewed thinktac.com's online summer program page, specifically the "Why ThinkTac" section and the curriculum section.

**One thing that works well**

The curriculum section is the strongest part of the page. It lists actual activities with specific, concrete descriptions - like testing the food students eat, making handmade paper through recycling, or building your own scale to compare masses. For a parent, this feels real and tangible, not vague marketing talk. As a developer, the layout is also clean and scannable - numbered list, short title, one-line description which si easy to read.

**Problem 1: "Why ThinkTac" section feels generic and unproven**

The cards (hands-on activities, convenient timing, build confidence, safe & trusted, builds critical skills) are the actual reasons a parent would choose ThinkTac - but right now they read like generic, AI-written marketing copy with no proof behind them. There are no real photos of workshops, students building projects, or any actual achievements.

*Fix:* Replace the generic text/icons with real images from workshops and student projects, plus actual proof points - awards, CBSE partnerships, NEP alignment, schools/students reached. This is the section that should build trust, and right now it just looks like anothter generic section of the webpage.

**Problem 2: Icons are emoji, not real icons**

The cards use emoji (👋 ⏰ 🛡️ 🧠) as functional icons. This looks inconsistent across devices/OS, and has no accessibility meaning for screen readers.

*Fix:* Use proper SVG icons with `aria-label`s.


---

## Part 4: Reflection

**The hardest part, and how I handled it:**

There wasn't really a "hard" part, but the closest thing was Firebase - I've mostly worked with MongoDB and PostgreSQL, so I'd never touched Firestore before, and figuring out how it worked took a bit of time. I got through it by going through the docs and using AI tools to fill the gaps, and once I understood the basic read/write pattern, it stopped feeling difficult - more like learning a new tool than struggling with a hard problem.

**What I'd want to learn more about if I joined ThinkTac:**

If I join ThinkTac, I'd definitely want to learn more about Firebase in production - things like security rules and scaling - since I've only used it at a basic level here. I'd also like to go deeper into working with LLMs: optimising responses, caching them properly, and adding guardrails to avoid token abuse.