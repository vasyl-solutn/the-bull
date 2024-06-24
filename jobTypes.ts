export interface JobData {
  type: string;
  // Define the structure of your job data here
  [key: string]: any;
}

export const JobType1Type = 'jobType1';
export const JobType2Type = 'jobType2';

export interface JobType1 extends JobData {
  type: typeof JobType1Type;
  prop1: string;
  prop2: number;
}

export interface JobType2 extends JobData {
  type: typeof JobType2Type;
  prop3: boolean;
  prop4: string[];
}
