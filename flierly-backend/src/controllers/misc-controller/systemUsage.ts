import { Request, Response } from 'express';
import os from 'os';

const systemUsage = async (req: Request, res: Response) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write(`${JSON.stringify(getSystemUsage())}\n\n`);

  // Send data every 2 seconds
  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify(getSystemUsage())}\n\n`);
  }, 2000);

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

export default systemUsage;

// Helper function to gather system information
function getSystemUsage() {
  const memoryUsage = process.memoryUsage();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();

  return {
    memory: {
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
      external: memoryUsage.external,
      totalMemory,
      freeMemory,
      memoryUsagePercentage: ((totalMemory - freeMemory) / totalMemory) * 100,
    },
    cpu: {
      loadAvg: os.loadavg(),
      cores: os.cpus().length,
      cpuUsage: process.cpuUsage(),
    },
  };
}
