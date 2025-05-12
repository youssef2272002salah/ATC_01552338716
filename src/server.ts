import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import process from 'process';
import app from './app';
import dbConnect from './config/database';


// // Cluster Mode (Only in the primary process)

// import cluster from 'cluster';
// import os from 'os';
// const numCPUs = os.cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary process ${process.pid} is running`);

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.error(`Worker ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });
// } else
{
  dbConnect();

  const PORT = process.env.PORT || 3001;

  const httpServer = http.createServer(app);



  httpServer.listen(PORT, () => {
    console.log(`🚀 Worker ${process.pid} running on port ${PORT}`);
  });

}
