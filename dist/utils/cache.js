"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = getCache;
exports.setCache = setCache;
exports.clearCache = clearCache;
exports.clearAllCache = clearAllCache;
const redis_1 = __importDefault(require("../config/redis"));
const logging_1 = require("../utils/logging");
/**
 * Retrieves cached data by key.
 * @param key - The cache key
 * @returns Parsed JSON data or null if not found
 */
async function getCache(key) {
    try {
        const data = await redis_1.default.get(key);
        return data ? JSON.parse(data) : null;
    }
    catch (error) {
        logging_1.logger.error(`❌ Redis GET Error for key: ${key}`, error);
        return null; // Fails gracefully without crashing
    }
}
/**
 * Sets cache with an expiration time.
 * @param key - The cache key
 * @param value - The value to store (automatically stringified)
 * @param ttl - Time to live in seconds (default: 60s)
 */
async function setCache(key, value, ttl = 60) {
    try {
        await redis_1.default.set(key, JSON.stringify(value), 'EX', ttl);
        logging_1.logger.info(`✅ Cache set: ${key} (TTL: ${ttl}s)`);
    }
    catch (error) {
        logging_1.logger.error(`❌ Redis SET Error for key: ${key}`, error);
    }
}
/**
 * Clears specific keys from cache (supports regex).
 * @param pattern - Exact string or RegExp pattern to match keys.
 */
async function clearCache(pattern) {
    try {
        if (typeof pattern === 'string') {
            await redis_1.default.del(pattern);
            logging_1.logger.info(`🗑 Cache cleared: ${pattern}`);
        }
        else {
            const keys = await redis_1.default.keys('*'); // Get all keys
            const matchedKeys = keys.filter((key) => pattern.test(key)); // Filter matching keys
            if (matchedKeys.length > 0) {
                await redis_1.default.del(...matchedKeys);
                logging_1.logger.info(`🗑 Cache cleared for pattern: ${pattern}, Matched Keys: ${matchedKeys.length}`);
            }
        }
    }
    catch (error) {
        logging_1.logger.error(`❌ Redis CLEAR Error for pattern: ${pattern}`, error);
    }
}
/**
 * Clears all cached data.
 */
async function clearAllCache() {
    try {
        await redis_1.default.flushall();
        logging_1.logger.info('🗑 All cache cleared!');
    }
    catch (error) {
        logging_1.logger.error('❌ Redis FLUSHALL Error', error);
    }
}
//# sourceMappingURL=cache.js.map