import express, { Request, Response } from 'express';
import myQueue from './queue'; // Ensure queue.js is also converted to queue.ts and properly exports myQueue

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/add-job', async (req: Request, res: Response) => {
  const jobData = req.body;
  try {
    const job = await myQueue.add('myJob', jobData);
    res.status(200).json({ jobId: job.id, status: 'Job added to the queue' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add the job to the queue' });
  }
});
