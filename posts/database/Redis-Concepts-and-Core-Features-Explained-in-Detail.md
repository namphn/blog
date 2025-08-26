---
title: "Redis Concepts and Core Features Explained in Detail"
date: "2025-07-14"
excerpt: "Redis is more than just an in-memory key-value store. In this article, we’ll dive into its data structures, single-threaded architecture, persistence options (RDB, AOF), clustering, TTL and eviction strategies, and common commands every developer should know."
author: "Nam Pham"
readTime: "7 min read"
image: "/post-image/redis-logo.png"
tags: ["database"]
---

# Concepts and Functions of Redis

## Overview of Redis
Redis is an in-memory key-value database designed to accelerate data retrieval. The **key** is always a string, while the **value** can be one of the following types: **String, List, Set, Hash, Stream, HyperLogLog, GeoSpatial, JSON**.

---

## Single Thread Event Loop
Redis uses a **single-threaded event loop** to handle requests, avoiding the complexity of multithreading.  
The reason Redis does not rely on multithreading is that its primary focus is ultra-fast data storage and retrieval with minimal latency.  
Since operations like `SET` and `GET` generally have **O(1)** time complexity, the CPU is not a bottleneck. Using multiple threads would not reduce latency but would instead introduce additional complexity such as **locking, race conditions, and context switching overhead**.

Starting from **Redis 6+**, multithreading was introduced for handling I/O tasks (request reception and response) to improve **throughput**, but core operations like `GET` and `SET` remain single-threaded.

---

## Communication Protocol
Redis uses the **RESP (REdis Serialization Protocol)**, a binary-safe text-based protocol, for communication between client and server.

---

## Durability Options
Redis offers three persistence options:

1. **RDB (Redis Database) Snapshot**  
   - Periodically writes the dataset to an `.rdb` file.  
   - **Pros:** Fast and simple.  
   - **Cons:** Risk of data loss between snapshots.  

2. **AOF (Append Only File)**  
   - Logs every write operation to a file for replay.  
   - Sync modes:  
     - `always`: safest, but slowest.  
     - `everysec`: sync every second (balanced and safe).  
     - `no`: relies on OS flushing (least safe).  

3. **No persistence**  
   - Redis functions purely as a cache without data recovery.

---

## Scalability
- **Replication:** Followers replicate data streams from the leader.  
- **Failover:** Monitors and automatically performs failover if the leader fails.  
- **Cluster:** Divides data into **16,384 hash slots** and automatically redirects requests if the target node does not hold the requested key.

---

## Common Commands

### String
- `SET`: Set key-value pair (options: `EX`/`PX` for TTL in seconds/milliseconds; `NX` only if key doesn’t exist; `XX` only if key exists).  
- `GET`: Retrieve value by key.  
- `INCR`: Increment integer value.  
- `DECR`: Decrement integer value.  
- `MGET`: Retrieve multiple values: `MGET key1 key2`.  

### List (Doubly Linked List)
- `LPUSH`: Push to the left.  
- `LPOP`: Pop from the left.  
- `RPUSH`: Push to the right.  
- `RPOP`: Pop from the right.  
- `LRANGE`: Get elements within a range.  

### Set
- `SADD`: Add one or more elements to a set.  
- `SREM`: Remove one or more elements from a set.  
- `SMEMBERS`: Get all elements.  
- `SISMEMBER`: Check if an element exists.  

### Hash
- `HSET`: Set or update a field.  
- `HGET`: Get a field.  
- `HGETALL`: Get all fields and values.  

### Sorted Set
- `ZADD`: Add or update an element with a score.  
- `ZSCORE`: Get the score of a member.  
- `ZRANGE`: Get elements within a score range.  

### Pub/Sub
- `SUBSCRIBE`: Subscribe to one or more channels (channels with no subscribers are removed).  
- `PUBLISH`: Send a message to a channel.  

### Stream
- `XADD`: Add an entry to a stream.  
- `XREAD`: Read from a stream (unlike Pub/Sub, streams store messages with a limit; old messages are deleted when the limit is reached).  

---

## TTL and Eviction
Keys can have **time-to-live (TTL)**. Two expiration mechanisms:

- **Lazy expiration:** Check TTL only during key access (e.g., `GET`, `SET`). Saves CPU but wastes memory for expired keys not yet accessed.  
- **Active expiration:** Runs multiple times per second, sampling keys with TTL and deleting expired ones aggressively if necessary.  

### Eviction Policies

| Group               | Policy            | Description                                    | Scope          | Deletion Criteria |
|---------------------|------------------|-----------------------------------------------|---------------|-------------------|
| **No eviction**     | `noeviction`    | Never evicts; returns an error on write when memory is full | All keys      | None              |
| **TTL-only eviction** | `volatile-lru` | Evict least recently used keys with TTL      | Keys with TTL | LRU              |
|                     | `volatile-lfu` | Evict least frequently used keys with TTL    | Keys with TTL | LFU              |
|                     | `volatile-ttl` | Evict keys with TTL closest to expiration    | Keys with TTL | TTL              |
|                     | `volatile-random` | Evict random keys with TTL                | Keys with TTL | Random           |
| **All-key eviction** | `allkeys-lru`  | Evict least recently used keys              | All keys      | LRU              |
|                     | `allkeys-lfu`  | Evict least frequently used keys            | All keys      | LFU              |
|                     | `allkeys-random` | Evict random keys                          | All keys      | Random           |

---

## Transactions in Redis
Unlike RDBMS transactions, Redis transactions group commands to execute **atomically** but **do not support rollback**.  

- `MULTI`: Start a transaction.  
- `EXEC`: Execute queued commands.  
- `DISCARD`: Cancel the transaction.  
- `WATCH`: Monitor keys; the transaction only executes if the keys remain unchanged (avoids race conditions).  
