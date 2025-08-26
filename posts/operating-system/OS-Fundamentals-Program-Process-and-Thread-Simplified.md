---
title: "OS Fundamentals: Program, Process, and Thread Simplified"
date: "2025-08-14"
excerpt: "Learn the differences between a program, a process, and a thread, and how they work together inside an operating system."
author: "Nam Pham"
readTime: "1 min read"
image: "/post-image/process-memory-layout.webp"
tags: ["database"]
---

### **Program**
A **program** is an executable file stored on disk that has not yet been executed. For example:
- `.exe` files that have been compiled into machine code.
- Java programs compiled into **bytecode** and packaged in a `.jar` file, ready to run on the JVM.

---

### **Process**
A **process** is a running program. Its memory structure includes:
- **Stack** – Stores local variables and the call stack.
- **Heap** – Dynamic memory allocation.
- **Code Segment** – Contains program instructions.
- **Data Segment** – Contains global variables.

Each process has its own **separate memory space**, meaning one process cannot access another process's memory.  
**Example:** Chrome creates a separate process for each browser tab.

---

### **Thread**
A **thread** is a smaller unit of execution within a process.  
- A process can have one or multiple threads.
- There is always a **main thread** that starts the execution of the process.
- Each thread has its **own stack**, but shares the **heap, code segment, and data segment** with other threads in the same process.
