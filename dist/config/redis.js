"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default({
    host: '127.0.0.1',
    port: 6379,
    // password: process.env.REDIS_PASSWORD   // Uncomment this line if you have a password
    retryStrategy: (times) => {
        if (times > 10) {
            return null;
        }
        return Math.min(times * 50, 2000);
    },
});
redis.on('error', (err) => {
    console.error('Redis Error:', err);
});
exports.default = redis;
//# sourceMappingURL=redis.js.map