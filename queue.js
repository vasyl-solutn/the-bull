const { Queue } = require('bullmq');
const connection = {
  host: 'localhost',
  port: 6379,
};

const myQueue = new Queue('myQueue', { connection });

module.exports = myQueue;
