import express, { Request, Response } from 'express';
import myQueue from './queue'; // Ensure queue.js is also converted to queue.ts and properly exports myQueue
import { JobType } from 'bullmq';
import { JobData } from './jobTypes';

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/add-job', async (req: Request, res: Response) => {
  const jobBody = req.body;
  const jobData = jobBody as JobType;
  try {
    console.log({ jobData });
    await myQueue.add('myJob', { ...jobBody as JobData, type: "jobType2" });
    await myQueue.add('myJob', { ...jobBody as JobData, type: "jobType1" });
    await myQueue.add('myJob', { ...jobBody as JobData, type: "jobType2" });
    await myQueue.add('myJob', { ...jobBody as JobData, type: "jobType3" });

    res.status(200).json({ status: 'Job added to the queue' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add the job to the queue' });
  }
});
