const { Worker } = require('bullmq');
const connection = {
  host: 'localhost',
  port: 6379,
};

const worker = new Worker('myQueue', async job => {
  // Process job logic here
  console.log(`Processing job ${job.id} with data:`, job.data);
}, { connection });

worker.on('completed', (job) => {
  console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} has failed with error ${err.message}`);
});
