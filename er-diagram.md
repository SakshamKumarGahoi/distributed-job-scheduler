User
 │
 └── Project
      │
      └── Queue
            │
            ├── RetryPolicy
            │
            └── Job
                  │
                  ├── JobExecution
                  ├── JobLog
                  └── DeadLetterQueue

Worker
 │
 ├── WorkerHeartbeat
 └── Job (claimedBy)