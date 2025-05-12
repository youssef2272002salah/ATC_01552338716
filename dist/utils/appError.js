"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    status;
    isOperational;
    errorCode;
    stackTrace;
    constructor(message, statusCode = 500, errorCode) {
        const formattedMessage = typeof message === 'object' ? JSON.stringify(message) : message;
        super(formattedMessage);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.errorCode = errorCode;
        // Capture Stack Trace to get line number
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            this.stackTrace = new Error().stack;
        }
    }
    getErrorLocation() {
        if (this.stack) {
            const stackLines = this.stack.split('\n');
            const callerLine = stackLines[1]?.trim();
            return callerLine;
        }
        return undefined;
    }
    toJSON() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
            errorCode: this.errorCode,
            location: this.getErrorLocation(),
            stack: this.stackTrace,
        };
    }
}
exports.AppError = AppError;
//# sourceMappingURL=appError.js.map