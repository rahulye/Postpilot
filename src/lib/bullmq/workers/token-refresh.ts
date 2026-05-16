import { Worker } from "bullmq";
import { connection } from "../redis";

export const tokenRefreshWorker = new Worker(
  "token-refresh",
  async (job) => {
    console.log(`Processing token refresh job ${job.id}`);
    // TODO: Implement OAuth token refresh logic
  },
  { connection }
);

tokenRefreshWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed!`);
});

tokenRefreshWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});
