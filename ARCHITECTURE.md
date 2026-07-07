# System Architecture

```
                    +--------------------+
                    |    React Client    |
                    +--------------------+
                              |
                              |
                              v
                    +--------------------+
                    |    Express API     |
                    +--------------------+
                              |
                              |
                              v
                    +--------------------+
                    |    PostgreSQL      |
                    +--------------------+
                       ^             ^
                       |             |
          Heartbeat    |             | Job Polling
                       |             |
                +--------------------+
                |   Worker Process   |
                +--------------------+
```

---

# Job Lifecycle

```
Create Job
     |
     v
 QUEUED
     |
     v
 Worker Poll
     |
     v
 CLAIMED
     |
     v
 RUNNING
     |
+----+-----+
|          |
v          v

SUCCESS   FAILURE
 |          |
 v          |
COMPLETED   |
            |
      Retry Available?
       /         \
     Yes         No
      |           |
      v           v
  QUEUED      DEAD LETTER
```

---

# Worker Flow

1. Poll database
2. Atomically claim job
3. Mark RUNNING
4. Execute
5. Store execution
6. Store logs
7. Retry or Complete
8. Send heartbeat

---

# Reliability

- Atomic Job Claim
- Retry Strategies
- Dead Letter Queue
- Worker Heartbeats
- Execution History