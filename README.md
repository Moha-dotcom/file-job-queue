# file-job-queue
- POST /order validates incoming orders via Zod and creates a job with uuid, status, and timestamp
    - Jobs written to pending.json for persistence using read-push-write pattern
    - File helpers (readJobFiles, writeQueue) handle ENOENT gracefully by returning empty array
    - Job and Order schemas defined with inferred TypeScript types
    - Separate JSON files planned for pending, processing, done, and failed states