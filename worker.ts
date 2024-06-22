import { Worker, Job } from 'bullmq';

interface JobData {
  // Define the structure of your job data here
  [key: string]: any;
}

const connection = {
  host: 'localhost',
  port: 6379,
};

const worker = new Worker<JobData>('myQueue', async (job: Job<JobData>) => {
  // Process job logic here
  console.log(`Processing job ${job.id} with data:`, job.data);
}, { connection });

worker.on('completed', (job: Job<JobData>) => {
  console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job: Job<JobData>, err: Error) => {
  console.log(`Job ${job.id} has failed with error ${err.message}`);
});
