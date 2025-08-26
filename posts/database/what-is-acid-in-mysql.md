---
title: "What is ACID in MySQL"
date: "2025-07-13"
excerpt: "ACID in MySQL ensures reliable transactions through Atomicity, Consistency, Isolation, and Durability. Learn why it's crucial for databases."
author: "Nam Pham"
readTime: "5 min read"
image: "/post-image/acid.jpg"
tags: ["database"]
---

# ACID properties in Database system

**ACID** refers to four essential properties in database systems designed to ensure data integrity and reliability. In real-world scenarios, systems often require strict accuracy and consistency of data. For example, financial and banking systems must guarantee that customer data is neither lost nor corrupted, especially when it comes to monetary transactions. Similarly, even something as simple as a restaurant booking system must ensure that the same table cannot be booked by two different customers at the same time.

## **A**tomicity

A transaction is indivisible; it cannot be partially executed. Either all the queries within the transaction are successfully executed, or none of them are. If an error occurs during execution, the system will roll back to the original state.

> **Example:** In a money transfer transaction where A sends money to B, the process involves deducting money from A’s account and crediting B’s account. If the crediting step fails for B, the system will roll back both accounts to their original state.


## **C**onsistency

Consistency ensures that the data remains in a valid state before and after the transaction. 
> **Example:** Using the same transfer example, if B receives the credited amount, A must have the corresponding debit. It’s not acceptable for A to lose money while B doesn’t gain it.

## **I**solation
Isolation means that transactions must execute independently without interfering with each other in a way that causes data anomalies.

> **Example:** consider a scenario where transaction A transfers money to B, and transaction C also transfers money to B. Initially, B has $50. A transfers $20 to B, and C transfers $10 to B, and both transactions occur simultaneously. The correct isolation level is required to prevent a situation where both A and C see B's balance as $50 and each updates it separately, resulting in B's balance being either $70 or $60 instead of the correct $80.

## **D**urability
Durability guarantees that once a transaction is committed, its changes are permanently saved, even if the database crashes. There should be no data loss after the commit.

## How MySQL Ensures ACID Properties
I will list some architectural components that InnoDB, the default storage engine of MySQL, uses to ensure ACID properties. I will also cover the implementation details in upcoming articles.

- Atomicity: Ensures atomic behavior through transactions: commit when the entire transaction is successfully executed, and roll back if at least one query within the transaction fails.

- Durability: Achieved using a double-write buffer when flushing data from memory.

- Consistency and Isolation: Implemented through Multi-Version Concurrency Control (MVCC), redo logs, and undo logs to maintain different isolation levels and ensure data consistency.

## How aboute trade of
While **ACID** ensures data integrity, it comes with downsides:
- Performance: Strong isolation and durability can slow transactions.
- Resource Usage: Requires extra logs, locks, and storage.
- Scalability: Harder to scale in distributed systems due to strict consistency.
- Availability: Can reduce uptime during failures to maintain consistency.

