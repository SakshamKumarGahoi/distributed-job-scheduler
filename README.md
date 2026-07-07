# Distributed Job Scheduler

A distributed job scheduling platform built using Node.js, Express, PostgreSQL, Prisma and React.

The system allows users to create projects, manage queues, schedule jobs, execute them using distributed workers, retry failed jobs using configurable retry strategies, and monitor execution through a web dashboard.

---

# Features

## Authentication

- JWT Authentication
- User Registration
- Login
- Protected APIs

## Project Management

- Create Projects
- View Projects
- Project Isolation per User

## Queue Management

- Create Queues
- Pause / Resume Queue
- Configure Concurrency
- Retry Policy

## Job Scheduling

- Immediate Jobs
- Scheduled Jobs
- Delayed Jobs
- Batch Jobs
- Priority Scheduling

## Distributed Workers

- Independent Worker Process
- PostgreSQL Polling
- Atomic Job Claiming
- Worker Heartbeats

## Reliability

- Retry Policies
- Dead Letter Queue
- Job Logs
- Execution History

## Dashboard

- Statistics Cards
- Queue Statistics Chart
- Jobs
- Workers
- Projects
- Queues

---

# Tech Stack

Frontend

- React
- Vite
- TailwindCSS
- Axios
- Recharts

Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Zod

---

# Architecture

Frontend
↓

Express API
↓

PostgreSQL

↑

Worker Process

Workers continuously poll PostgreSQL for available jobs using atomic row locking.

---

# Project Structure

backend/
src/
controllers/
routes/
services/
worker/
middleware/
validators/

frontend/
src/
pages/
components/
layouts/

---

# Installation

## Clone

```bash
git clone <repo-url>

cd distributed-job-scheduler
```

Backend

```bash
cd backend

npm install
```

Create `.env`

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/scheduler_db

JWT_SECRET=your_secret

PORT=5000
```

Run migrations

```bash
npx prisma migrate dev

npx prisma generate
```

Run backend

```bash
npm run dev
```

Run worker

```bash
npm run worker
```

Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Running Tests

```bash
npm test
```

---

# Future Improvements

- Redis based queue
- Kafka support
- Distributed locking
- WebSockets
- Cron parser
- RBAC
- Workflow dependencies
- Horizontal worker autoscaling

---

# Author

Saksham Gahoi