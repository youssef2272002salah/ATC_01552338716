"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../users/user.model");
const appError_1 = require("../../utils/appError");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const logging_1 = require("../../utils/logging");
exports.protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    const authReq = req;
    let token;
    if (authReq.headers.authorization?.startsWith('Bearer')) {
        token = authReq.headers.authorization.split(' ')[1];
    }
    else if (authReq.cookies?.jwt) {
        token = authReq.cookies.jwt;
    }
    if (!token) {
        throw new appError_1.AppError('You are not logged in. Please log in to access this resource.', 401);
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        throw new appError_1.AppError('Invalid token. Please log in again.', 401);
    }
    const currentUser = await user_model_1.UserModel.findById(decoded.id);
    if (!currentUser) {
        throw new appError_1.AppError('The user belonging to this token no longer exists.', 401);
    }
    if (currentUser.passwordChangedAt) {
        const passwordChangedTimestamp = Math.floor(currentUser.passwordChangedAt.getTime() / 1000);
        if (decoded.iat < passwordChangedTimestamp) {
            throw new appError_1.AppError('User recently changed password. Please log in again.', 401);
        }
    }
    authReq.user = currentUser;
    res.locals.user = currentUser;
    next();
});
const restrictTo = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        (0, logging_1.log)('warn', '[AuthService] User does not have permission to perform this action', {
            userId: req.user?._id,
        });
        return next(new appError_1.AppError('You do not have permission to perform this action.', 403));
    }
    next();
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=auth.middleware.js.map