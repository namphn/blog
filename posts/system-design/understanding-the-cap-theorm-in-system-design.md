---
title: "CAP Theorem Explained: Choosing Between Consistency and Availability"
date: "2025-08-30"
excerpt: "The CAP theorem states that distributed systems can only guarantee two out of three properties: Consistency, Availability, and Partition Tolerance. In practice, network partitions are unavoidable, so system designers must decide whether to prioritize Consistency or Availability based on real-world use cases."
author: "Nam Pham"
readTime: "2 min read"
image: "/post-image/database-cap-therorem.png"
tags: ["system-design"]
---

# Understanding the CAP Theorem in System Design

When designing distributed systems, one of the fundamental principles to understand is the **CAP theorem**. It states that a distributed system can only optimize **two out of three** important properties:

- **Consistency (C):** All nodes in the system must have the same data at the same time. Every read should return the most recent write.
- **Availability (A):** The system continues to operate and respond to requests even if some nodes are down.
- **Partition Tolerance (P):** The system remains operational even when there are network issues (nodes cannot communicate with each other).

---

## The CAP Trade-Off

In theory, you can only achieve **two of the three** properties:

- **CP (Consistency + Partition Tolerance):** Prioritizes correctness of data and tolerance to network failures, but may sacrifice availability.
- **AP (Availability + Partition Tolerance):** Prioritizes system uptime and tolerance to network failures, but may sacrifice consistency.
- **CA (Consistency + Availability):** Prioritizes data correctness and system uptime, but **cannot exist in real distributed systems** because network partitions are inevitable.

In real-world distributed systems, partitions (network issues) are unavoidable. This means **CA is not practically achievable**. Therefore, the trade-off is always between **Consistency (C)** and **Availability (A)**, while **Partition Tolerance (P)** is a must-have.

---

## Example: Consistency vs Availability

Let’s consider a distributed key-value store:

- **If we prioritize Consistency (CP):**
  - When one node goes down, the system blocks write operations (insert, update, delete) until the node recovers and syncs back.
  - This ensures all nodes always have the same data.
  - However, the system sacrifices **Availability**, since users may not be able to perform updates while waiting.

- **If we prioritize Availability (AP):**
  - When one node goes down, the system continues to allow updates on the remaining healthy nodes.
  - Data will be synchronized later when the failed node recovers.
  - This ensures the system is always responsive, but sacrifices **Consistency**, as the recovered node may temporarily have stale data.

---

## Real-World Examples

- **CP Systems (Consistency-focused):** Banking and financial systems, where it is critical that balances and transactions remain consistent across all nodes.
- **AP Systems (Availability-focused):** Social networks, media platforms, and entertainment systems, where temporary inconsistency is acceptable as long as the system remains usable.

---

## Key Takeaway

The CAP theorem teaches us that **you cannot have it all** in distributed systems. In the presence of network partitions (which are inevitable), you must **choose between Consistency and Availability**, depending on your system’s requirements.
