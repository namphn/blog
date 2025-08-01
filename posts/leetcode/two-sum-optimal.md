---
title: "Two Sum - Optimal Solution Explained"
date: "2024-12-05"
excerpt: "Master the classic Two Sum problem with HashMap approach for O(n) time complexity"
author: "Nam Pham"
readTime: "5 min read"
image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop"
tags: ["algorithm", "hashmap", "interview", "easy"]
---

# Two Sum Problem Solution

The **Two Sum** problem is one of the most fundamental coding interview questions that every developer should master. It's simple to understand but teaches important algorithmic concepts.

## Problem Statement

Given an array of integers `nums` and an integer `target`, return **indices** of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

### Example 1:
```python
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] = 2 + 7 = 9, we return [0, 1].
```

### Example 2:
```python
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Example 3:
```python
Input: nums = [3,3], target = 6
Output: [0,1]
```

## Approach 1: Brute Force

The naive approach is to check every pair of numbers in the array.

```python
def twoSum(nums: List[int], target: int) -> List[int]:
    """
    Brute force approach - check all pairs
    """
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    
    # Should never reach here given problem constraints
    return []
```

### Complexity Analysis:
- **Time Complexity:** O(n²) - We have nested loops
- **Space Complexity:** O(1) - No extra space used

### Problems with this approach:
- Very slow for large arrays
- Not optimal for interview settings
- Doesn't scale well

## Approach 2: HashMap Solution (Optimal)

We can solve this in **O(n)** time using a HashMap to store numbers we've seen.

### The Key Insight:
> For each number `x`, we need to find if `target - x` exists in the array.

```python
def twoSum(nums: List[int], target: int) -> List[int]:
    """
    Optimal solution using HashMap
    Time: O(n), Space: O(n)
    """
    # Dictionary to store: number -> index
    num_to_index = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        # Check if complement exists in our HashMap
        if complement in num_to_index:
            return [num_to_index[complement], i]
        
        # Store current number and its index
        num_to_index[num] = i
    
    # Should never reach here given problem constraints
    return []
```

### Step-by-Step Walkthrough:

Let's trace through `nums = [2, 7, 11, 15]`, `target = 9`:

1. **i=0, num=2**:
   - `complement = 9 - 2 = 7`
   - `7` not in HashMap yet
   - Store: `{2: 0}`

2. **i=1, num=7**:
   - `complement = 9 - 7 = 2`
   - `2` exists in HashMap at index `0`
   - Return `[0, 1]` ✅

### Complexity Analysis:
- **Time Complexity:** O(n) - Single pass through array
- **Space Complexity:** O(n) - HashMap storage

## JavaScript Implementation

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const numToIndex = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numToIndex.has(complement)) {
            return [numToIndex.get(complement), i];
        }
        
        numToIndex.set(nums[i], i);
    }
    
    return []; // Should never reach here
};
```

## Java Implementation

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> numToIndex = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        if (numToIndex.containsKey(complement)) {
            return new int[]{numToIndex.get(complement), i};
        }
        
        numToIndex.put(nums[i], i);
    }
    
    throw new IllegalArgumentException("No solution found");
}
```

## Key Takeaways

> **The HashMap pattern is extremely common in coding interviews!**

1. **Trade space for time** - We use O(n) extra space to achieve O(n) time
2. **One-pass solution** - We solve it in a single iteration
3. **Think about complements** - For each element, what do we need to make the target?
4. **HashMap lookup is O(1)** - This makes the solution efficient

## Common Variations

This pattern appears in many other problems:

- **3Sum** - Find three numbers that sum to target
- **4Sum** - Find four numbers that sum to target  
- **Two Sum II** - Input array is sorted
- **Two Sum BST** - Find two nodes in BST that sum to target

## Interview Tips

1. **Always start with brute force** - Show you understand the problem
2. **Identify the bottleneck** - Why is brute force slow?
3. **Think about trade-offs** - Space vs Time complexity
4. **Code cleanly** - Use meaningful variable names
5. **Test with examples** - Walk through your solution

## Edge Cases to Consider

```python
# Edge case examples
nums = [3, 3], target = 6  # Duplicate numbers
nums = [1, 2], target = 3  # Minimum case
nums = [0, 4, 3, 0], target = 0  # Zero values
```

Remember: The key insight is recognizing that **for each number, we're looking for its complement**. HashMap gives us O(1) lookup to find that complement efficiently!