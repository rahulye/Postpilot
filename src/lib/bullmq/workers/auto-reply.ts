import { Worker } from "bullmq";
import { connection } from "../redis";

export const autoReplyWorker = new Worker(
  "auto-reply",
  async (job) => {
    console.log(`Processing auto-reply job ${job.id}`);
    // TODO: Implement comment polling and AI reply logic
  },
  { connection }
);

autoReplyWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed!`);
});

autoReplyWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});
