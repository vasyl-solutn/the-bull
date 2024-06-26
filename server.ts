import express, { Request, Response } from 'express';
import myQueue from './queue';
import { JobType } from 'bullmq';
import { JobData } from './jobTypes';
import Arena from 'bull-arena';
import { Queue } from "bullmq";

const app = express();
const port = 3000;

// Bull Arena configuration
const arena = Arena({
  BullMQ: Queue,
  // FlowBullMQ: FlowProducer,
  queues: [
    {
      type: 'bullmq', // Specify using BullMQ
      name: "myJob", // Name of your queue
      hostId: "MyAwesomeQueues", // Identifier for the host
      redis: {
        host: '127.0.0.1', // Redis host
        port: 6379, // Redis port
        // password: 'your_redis_password', // Uncomment and set your Redis password if required
      },
    },
  ],
}, {
  basePath: '/arena', // The path to mount the Bull Arena dashboard
  disableListen: true // Let Express handle the listening
});

app.use(express.json());

app.use('/arena', arena); // Serve Bull Arena dashboard

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/add-job', async (req: Request, res: Response) => {
  const jobBody = req.body;
  const jobData = jobBody as JobType;
  try {
    console.log({ jobData });
    await myQueue.add('myJob', { ...jobBody as JobData, type: "jobType2" }, { priority: 8 });
    await myQueue.add('myJob', { ...jobBody as JobData, type: "jobType1" });
    await myQueue.add('myJob', { ...jobBody as JobData, type: "jobType2" }, { priority: 1 });
    await myQueue.add('myJob', { ...jobBody as JobData, type: "jobType3" });
    await myQueue.add('myJob', { ...jobBody as JobData, type: "jobTypeCanFail" }, { attempts: 10, backoff: 300});

    res.status(200).json({ status: 'Job added to the queue' });
  } catch (error) {
    console.error('Error adding job to the queue:', error);
    res.status(500).json({ error: 'Failed to add job to the queue' });
  }
});
