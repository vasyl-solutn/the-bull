import { Queue } from 'bullmq';

const connection = {
  host: 'localhost',
  port: 6379,
};

const myQueue = new Queue('myQueue', { connection });

export default myQueue;
