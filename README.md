# File-Based Job Queue

A Node.js + TypeScript REST API that simulates a pizza order processing system using a file-based job queue.

## What It Does

When a customer places an order, it is added to a queue and processed asynchronously in the background. Jobs move through four states tracked in separate JSON files:

pending.json → processing.json → done.json
→ failed.json

## How It Works

- `POST /order` — validates the order with Zod and writes it as a job to `pending.json`
- A worker runs on an interval, picks up the next pending job, and moves it through the pipeline
- An EventEmitter bridges the processor and the completion handler
- All queue state is persisted to the `jobs/` directory

## Tech Stack

- Node.js + TypeScript
- Express
- Zod (validation)
- Node.js `fs/promises` (file persistence)
- Node.js `EventEmitter` (job event handling)

## Run It

  ```bash
  npm install
  npm run dev

  Example Request

  POST /order
  {
    "firstName": "Mohamed",
    "lastName": "Abdullahi",
    "item": [{ "name": "pizza barbeque" }]
  }
- POST /order validates incoming orders via Zod and creates a job with uuid, status, and timestamp
    - Jobs written to pending.json for persistence using read-push-write pattern
    - File helpers (readJobFiles, writeQueue) handle ENOENT gracefully by returning empty array
    - Job and Order schemas defined with inferred TypeScript types
    - Separate JSON files planned for pending, processing, done, and failed states