# Task Management API

A minimal task management REST API built with Node.js, TypeScript, Express, and Firebase Firestore. Includes an AI-powered summary endpoint using OpenAI.

---

## Tech Stack

- **Runtime**: Node.js + TypeScript 
- **Framework**: Express
- **Database**: Firebase Firestore (Emulator)
- **AI**: OpenAI GPT-4o-mini
- **Validation**: Zod

---

## Project Structure
src/

config/          → env validation, OpenAI client

controller/     → route logic (createTask, listTasks, summariseTasks)

db/              → Firebase admin initialization

middleware/      →  rate limiters

routes/          → endpoint definitions

schemas/         → Zod validation schemas

services/        → OpenAI summary service

---


## Setup

**1. Clone the repo**
```bash
git clone https://github.com/yourname/think-tac-task.git
cd folder
```

**2. Install dependencies**
```bash
npm install
```

**3. Create your `.env` file**
```bash
cp .env.example .env
```

Fill in the values:
```dotenv
PORT=5000
FIREBASE_PROJECT_ID=think-tac-task
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
OPENAI_API_KEY=your_openai_key_here
```

---

## Running the App

You need **two terminals**:

**Terminal 1 — Start the Firebase Emulator**
```bash
npm run emulator
```

**Terminal 2 — Start the dev server**
```bash
npm run dev
```

Server runs on `http://localhost:5000`
Emulator UI runs on `http://localhost:4000`

---

## API Endpoints

All endpoints require the header:

| Method | Endpoint        | Description                        |
|--------|-----------------|------------------------------------|
| POST   | /tasks          | Create a new task                  |
| GET    | /tasks          | List all tasks ordered by creation |
| GET    | /tasks/summary  | AI-generated summary of all tasks  |


## Postman Collection

Import the collection to test all endpoints.

---

## Notes

- Firebase Emulator is used throughout — no live Firebase project needed
- OpenAI key is required for the summary endpoint; if unavailable, the endpoint returns a 500 with a clear error message
- Rate limiting is applied: 50 requests/15 min globally, 7 requests/hour on the summary endpoint