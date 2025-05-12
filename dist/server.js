"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const process_1 = __importDefault(require("process"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
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
    (0, database_1.default)();
    const PORT = process_1.default.env.PORT || 3001;
    const httpServer = http_1.default.createServer(app_1.default);
    httpServer.listen(PORT, () => {
        console.log(`🚀 Worker ${process_1.default.pid} running on port ${PORT}`);
    });
}
//# sourceMappingURL=server.js.map