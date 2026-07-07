# API Documentation

## Authentication

POST /api/auth/register

Registers a new user.

---

POST /api/auth/login

Returns JWT Token.

---

## Projects

GET /api/projects

Returns all projects.

POST /api/projects

Creates project.

PATCH /api/projects/:id

Updates project.

---

## Queues

GET /api/queues

Returns queues.

POST /api/queues

Creates queue.

PATCH /api/queues/:id

Updates queue.

PATCH /api/queues/:id/pause

Pauses queue.

PATCH /api/queues/:id/resume

Resumes queue.

GET /api/queues/:id/stats

Returns queue statistics.

---

## Jobs

POST /api/queues/:queueId/jobs

Creates job.

GET /api/jobs

Returns jobs.

GET /api/jobs/:id

Returns job details.

GET /api/jobs/:id/logs

Returns job logs.

---

## Dashboard

GET /api/dashboard

Returns

- Projects
- Queues
- Jobs
- Workers