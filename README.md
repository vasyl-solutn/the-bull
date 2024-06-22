# The BullMQ Express App

This project is a Node.js application built with Express and BullMQ. It is designed to demonstrate the integration of BullMQ for job queue management within an Express application. The application allows users to add jobs to a queue and processes these jobs asynchronously using a worker.

## Features

- **Express Setup**: A basic Express server setup to handle HTTP requests.
- **BullMQ Integration**: Utilizes BullMQ for managing job queues, adding jobs to the queue, and processing them.
- **Endpoints**: Provides RESTful endpoints to add jobs to the queue.
- **Worker**: A separate worker process for processing the jobs added to the BullMQ queue.

## Getting Started

### Prerequisites

- Node.js (v18.x)
- Redis server (for BullMQ)

### Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-repository/the-bull.git

## Run
Start the server: node server.js
Start the worker: node worker.js

## Dev mode
npm run dev
