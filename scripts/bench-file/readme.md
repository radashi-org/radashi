This script exists to avoid out-of-memory issues when running more than only a couple benchmarks in CI. Ideally, we wouldn't need it.

It acts as an entry point for benchmarking a single file with Vitest.
