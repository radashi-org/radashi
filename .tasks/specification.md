🛠 queueByKey: Utility Function Specification

📌 Purpose

queueByKey wraps an asynchronous function and ensures that calls with the same key are queued and executed sequentially, one at a time, in the order they were received. This is useful in scenarios where:
	•	You need to avoid race conditions per logical group (e.g., by user ID or resource ID).
	•	You want to serialize operations like updates, writes, or API calls that must not overlap per key.
	•	You want to throttle function executions per group, but not globally.

⸻

🧾 Signature

function queueByKey<TArgs extends any[], TResult>(
  asyncFn: (...args: TArgs) => Promise<TResult>,
  keyFn: (...args: TArgs) => string | number
): (...args: TArgs) => Promise<TResult>


⸻

📦 Parameters
	•	asyncFn
The asynchronous function to wrap. It must return a Promise.
	•	keyFn
A function that derives a key (string or number) from the input arguments of asyncFn. Calls with the same derived key will be queued and executed one after another.

⸻

🔄 Behavior
	•	Serial Execution Per Key
Calls to the returned function are grouped by the value returned from keyFn. For each key:
	•	Only one invocation of asyncFn runs at a time.
	•	Subsequent calls are queued and wait for the previous call (with the same key) to finish.
	•	The queue is FIFO per key.
	•	Parallel Across Keys
Calls with different keys are executed concurrently, each with their own queue.
	•	Preserved Return Values
Each call returns a Promise that resolves or rejects with the value from its own execution of asyncFn.

⸻

🧠 Example Usage

const updateUser = async (userId: string, newData: object) => {
  // Simulate API call
  await fetch(`/api/users/${userId}`, { method: "POST", body: JSON.stringify(newData) });
};

const queuedUpdateUser = queueByKey(updateUser, (userId) => userId);

// These will run sequentially if they share the same userId
queuedUpdateUser("user123", { name: "Alice" });
queuedUpdateUser("user123", { name: "Bob" });
queuedUpdateUser("user456", { name: "Charlie" }); // Runs in parallel with user123's queue


⸻

⚠️ Edge Cases & Considerations
	•	Errors
If asyncFn rejects, the rejection is propagated to the caller, and the queue continues normally.
	•	Memory Leaks
You should ensure that internal queues are cleaned up after completion (especially for keys that are no longer used), to prevent memory growth over time.
	•	Timeouts or Cancellation (optional enhancement)
You could extend the implementation to support cancellation tokens or timeouts per queued item, though this is not required for the basic version.

⸻

🧪 Test Cases to Validate
	1.	✅ Calls with different keys run in parallel.
	2.	✅ Calls with the same key run in order.
	3.	✅ Results are returned to each caller properly.
	4.	✅ Errors from asyncFn are propagated correctly.
	5.	✅ Memory is cleaned up after queues empty.

⸻

Let me know if you’d like the actual implementation too!