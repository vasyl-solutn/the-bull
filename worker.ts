import { Worker, Job } from 'bullmq';
import { JobData, JobType1, JobType1Type, JobType2, JobType2Type, JobTypeCanFail, JobTypeCanFailType } from './jobTypes';

const connection = {
  host: 'localhost',
  port: 6379,
};

const someAsyncOperation = async (delay: number) => {
  // const delay = Math.floor(Math.random() * (2500)) + 500;
  await new Promise(resolve => setTimeout(resolve, delay));
};

const processingJobType1 = async (jobData: JobType1) => {
  console.log('Processing JobType1:', jobData);
  await someAsyncOperation(2500);
  jobData.result = 'JobType1 completed successfully';
};

const processingJobType2 = async (jobData: JobType2) => {
  console.log('Processing JobType2:', jobData);
  await someAsyncOperation(300);
  jobData.result = 'JobType2 completed successfully';
};

const processingJobCanFail = async (jobData: JobTypeCanFail) => {
  console.log('Processing JobTypeCanFail:', jobData);
  await someAsyncOperation(200);
  if (Math.random() > 0.15) {
    throw new Error('JobTypeCanFail failed');
  }
  jobData.result = 'JobTypeCanFail completed successfully';
};

const worker = new Worker<JobData>('myQueue', async (job: Job<JobData>) => {
  const jobData = job.data;
  await job.updateProgress(50);

  switch (jobData.type) {
    case JobType1Type:
      await processingJobType1(jobData as JobType1);
      break;
    case JobType2Type:
      await processingJobType2(jobData as JobType2);
      break;
    case JobTypeCanFailType:
      await processingJobCanFail(jobData as JobTypeCanFail);
      break;
    default:
      throw new Error('Invalid job type');
  }

  console.log(`Processing job ${job.id} with data:`, jobData);
}, { connection, concurrency: 2 });

worker.on('completed', (job: Job<JobData>) => {
  console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job: Job<JobData> | undefined, err: Error, prev: string) => {
  const jobId = job ? job.id : prev;
  console.log(`Job ${jobId} has failed with error ${err.message}`);
});
