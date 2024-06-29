declare module 'bull-arena' {
  import { Queue } from 'bullmq';

  interface QueueOptions {
    name: string;
    hostId: string;
    type: 'bull' | 'bullmq';
    redis: any; // You might want to replace 'any' with a more specific type for Redis options
  }

  interface ArenaOptions {
    BullMQ?: typeof Queue;
    queues: QueueOptions[];
  }

  interface ArenaConfig {
    basePath?: string;
    disableListen?: boolean;
  }

  function Arena(options: ArenaOptions, config: ArenaConfig): any;

  export = Arena;
}
