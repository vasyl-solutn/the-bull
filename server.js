const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const myQueue = require('./queue');

app.post('/add-job', async (req, res) => {
  const jobData = req.body;
  try {
    const job = await myQueue.add('myJob', jobData);
    res.status(200).json({ jobId: job.id, status: 'Job added to the queue' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add the job to the queue' });
  }
});
