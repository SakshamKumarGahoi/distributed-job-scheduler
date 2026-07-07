# Design Decisions

## PostgreSQL Instead of Redis

The assignment required avoiding Redis/Kafka.

PostgreSQL was used as the single source of truth for persistence and worker coordination.

Atomic row locking using FOR UPDATE SKIP LOCKED prevents multiple workers from claiming the same job.

---

## Separate Worker Process

Workers execute independently from the API.

Advantages

- Horizontal scaling
- Independent deployment
- API remains responsive

---

## JobExecution Table

Job stores current state.

JobExecution stores execution history.

Benefits

- Complete audit trail
- Retry history
- Performance metrics

---

## Retry Policies

Three retry strategies are supported.

- Fixed
- Linear
- Exponential

Queues share retry policies instead of duplicating configuration.

---

## Dead Letter Queue

Jobs exceeding maximum retry count are moved into DLQ.

Benefits

- Prevent infinite retry loops
- Preserve failed jobs
- Easier debugging

---

## Simplifications

To meet the assignment timeline, the following production features were intentionally omitted.

- RBAC
- Distributed Lock Service
- Workflow Dependencies
- Kafka
- Redis
- WebSockets
- Full Cron Parser
- Queue Sharding

Each can be integrated in future iterations without significant architectural changes.