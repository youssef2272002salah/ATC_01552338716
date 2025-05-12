"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.morganMiddleware = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
require("winston-daily-rotate-file");
dotenv_1.default.config();
// Define custom log format
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.printf(({ level, message, timestamp, ...meta }) => {
    let metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${metaStr}`;
}));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new winston_1.default.transports.Console(),
    ],
});
exports.logger = logger;
const morganMiddleware = (0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
});
exports.morganMiddleware = morganMiddleware;
const log = (level, message, meta) => {
    logger.log(level, message, meta);
};
exports.log = log;
//# sourceMappingURL=logging.js.map