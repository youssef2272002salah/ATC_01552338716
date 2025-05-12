"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = require("../utils/appError");
const logging_1 = require("./logging");
/**
 * Handles Mongoose CastError (Invalid ObjectId, etc.)
 */
const handleCastErrorDB = (err) => {
    return new appError_1.AppError(`Invalid value '${err.value}' for field '${err.path}'`, 400);
};
/**
 * Handles Duplicate Field Errors (MongoDB)
 */
const handleDuplicateFieldsDB = () => {
    return new appError_1.AppError('Duplicate field value. Please use a unique value.', 400);
};
/**
 * Handles JWT Errors (Invalid or Expired)
 */
const handleJWTError = () => new appError_1.AppError('Invalid token. Please log in again.', 401);
const handleJWTExpiredError = () => new appError_1.AppError('Token expired. Please log in again.', 401);
/**
 * Handles Syntax Errors (e.g., Invalid JSON in request body)
 */
const handleSyntaxError = () => new appError_1.AppError('Invalid JSON syntax in request body.', 400);
/**
 * Handles Rate Limit Errors (e.g., Too Many Requests)
 */
const handleRateLimitError = () => new appError_1.AppError('Too many requests. Please try again later.', 429);
/**
 * Sends Error Response in Development Mode
 */
const sendErrorDev = (err, req, res) => {
    if (res.headersSent)
        return;
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};
/**
 * Sends Error Response in Production Mode
 */
const sendErrorProd = (err, req, res) => {
    if (res.headersSent)
        return;
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
/**
 * Global Error Handling Middleware
 */
const globalErrorHandler = (err, req, res, next) => {
    let error = err instanceof appError_1.AppError
        ? err
        : new appError_1.AppError(err.message || 'An unexpected error occurred', err.statusCode || 500);
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    // Handle Specific Error Types
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const messages = Object.values(err.errors).map((e) => e.message);
        error = new appError_1.AppError(messages.join(', '), 400);
    }
    if (err instanceof mongoose_1.default.Error.CastError)
        error = handleCastErrorDB(err);
    if (err.code === 11000)
        error = handleDuplicateFieldsDB();
    if (err.name === 'JsonWebTokenError')
        error = handleJWTError();
    if (err.name === 'TokenExpiredError')
        error = handleJWTExpiredError();
    if (err instanceof SyntaxError && 'body' in err)
        error = handleSyntaxError();
    if (err.status === 429)
        error = handleRateLimitError();
    // Handle Express-Specific Errors
    if (err.code === 'EBADCSRFTOKEN') {
        error = new appError_1.AppError('Invalid CSRF token. Please refresh and try again.', 403);
    }
    if (err.code === 'ECONNREFUSED') {
        error = new appError_1.AppError('Database connection refused. Please try again later.', 503);
    }
    // Log error (Ensure logs are available in production)
    logging_1.logger.error({
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Hide stack in production
        status: error.status,
        statusCode: error.statusCode,
    });
    // Send appropriate error response based on environment
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(error, req, res);
    }
    else {
        sendErrorProd(error, req, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=errorHandler.js.map