"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const appError_1 = require("./appError");
/**
 * Validates request data (body, query, or headers) using a DTO class.
 * - Supports `req.body`, `req.query`, and `req.headers`
 * - Provides detailed validation error messages
 * - Enforces strict validation (`whitelist` and `forbidNonWhitelisted`)
 *
 * @param DtoClass The DTO class to validate against
 * @param source The request source: "body" (default), "query", or "headers"
 */
const validateDto = (DtoClass, source = 'body') => {
    return async (req, res, next) => {
        const data = req[source];
        const dtoInstance = (0, class_transformer_1.plainToInstance)(DtoClass, data);
        const errors = await (0, class_validator_1.validate)(dtoInstance, { whitelist: true, forbidNonWhitelisted: true });
        if (errors.length > 0) {
            return next(new appError_1.AppError(JSON.stringify(formatErrors(errors)), 400));
        }
        req[source] = dtoInstance; // Override request data with validated DTO
        next();
    };
};
exports.validateDto = validateDto;
/**
 * Formats validation errors into a structured response.
 *
 * @param errors Array of validation errors
 * @returns Formatted error object with field names and corresponding errors
 */
const formatErrors = (errors) => {
    return errors.map((e) => ({
        field: e.property,
        errors: Object.values(e.constraints || {}),
    }));
};
//# sourceMappingURL=validateDto.js.map