---
title: "Understanding Virtual Memory: How OS Manages Memory Efficiently"
date: "2025-08-15"
excerpt: "A comprehensive guide to virtual memory: how it works, why it exists, and how operating systems manage paging, page tables, and memory efficiently."
author: "Nam Pham"
readTime: "5 min read"
image: "/post-image/virtual-memory.png"
tags: ["database"]
---

## Virtual Memory

**Virtual memory** is an operating system memory management technique that simulates a larger memory space than the actual physical RAM by using **virtual addresses** and mapping them to **physical addresses**, while leveraging disk storage for extension.  

In simple terms, the OS provides an **abstract interface** called virtual memory. Each process uses this interface to access memory without knowing the underlying implementation. From the process's perspective, it appears to have a **continuous block of memory** (e.g., addresses 1234 → 1235 → 1236), but in reality, these addresses are scattered across physical memory.

---

### **Purpose of Virtual Memory**
- **Support multitasking** – Allows multiple programs to run simultaneously.
- **No need to load the entire program into memory** – Only the required parts are loaded.
- **Enable programs larger than physical memory** – Even if actual RAM is insufficient.
- **Use both RAM and disk storage** – Only necessary portions of the program are loaded into RAM.
- **Improve memory management efficiency**.

---

### **How Virtual Memory Works**
1. The **application** accesses a virtual address.
2. The **OS** and **MMU (Memory Management Unit)** translate the virtual address into a physical address.
3. Data is retrieved from RAM or disk.

---

### **Details**
- Physical RAM is divided into **frames**, while virtual memory is divided into **pages**, typically **4KB** each.
- When a program accesses an address (e.g., `0x1000`), the address must be translated into:
    - **Page number** (using the upper bits)
    - **Offset** within the page (using the lower bits)
- For a **4KB page**, the virtual address structure:
    - **20 bits** → Page number
    - **12 bits** → Offset within the page

![virtual-memory](/post-image/memory-frame-map.jpg)

---

### **Address Translation Process**
- MMU checks the **TLB (Translation Lookaside Buffer)**:
    - **Hit** → Physical address is returned immediately.
    - **Miss** → Access the **Page Table** to find the physical address.
- **Page Table** is an array of entries:
    - On a 32-bit system, we have `2^32` addresses (4 GB of virtual space).
    - Each page = 4KB → `4GB / 4KB = 1,048,576` page table entries.
    - A **single-level page table** would require ~4MB of memory for the table itself, and with 100 processes, this becomes ~400MB → **inefficient**.

---

### **Multi-level Page Table**
- Instead of creating 1,048,576 entries upfront, use multiple levels:
    - **Page Directory** → 1024 entries
    - Each entry points to another **Page Table** with 1024 entries.
- Initially, only the **first level** is allocated.
- Additional levels are created **on-demand** when a page is accessed.
- This avoids allocating the full address space when the process starts.

---

### **Page Fault Handling & Swapping**
- If the page is **not present** in RAM (Page Fault), the OS:
    - Selects a victim page (based on a replacement algorithm)
    - Writes it to disk (if modified)
    - Loads the required page from disk into memory
    - Updates the Page Table.

---

### **Virtual Address & Page Table Entry Structure**
- **32-bit system**:
    - Virtual address:  
        - **20 bits** → Page index  
        - **12 bits** → Offset
    - Page Table Entry (32 bits):
        - **20 bits** → Physical frame address
        - **12 bits** → Flags:
            - **Present** – Is the page in RAM?
            - **Read/Write** – 1 = writable, 0 = read-only
            - **User/Supervisor** – Access rights (user mode or kernel mode)
            - **Execute** – Can execute code in this page?
            - **Dirty** – Modified since load (used to decide whether to write back to disk)
            - **Accessed** – Recently accessed flag (used by replacement algorithms)

---

### **Page Replacement Algorithms**
- **FIFO (First In, First Out)**  
    Replace the oldest loaded page. (Simple but can evict frequently used pages)
- **LRU (Least Recently Used)**  
    Replace the least recently used page. (Accurate but expensive to implement)
- **Clock Algorithm**  
    Pages arranged in a circular list with reference bits (0 or 1):
    - If bit = 0 → replace this page.
    - If bit = 1 → set it to 0 and move to the next.
    - Periodically reset bits.
    - More efficient than LRU and better than FIFO.

---
