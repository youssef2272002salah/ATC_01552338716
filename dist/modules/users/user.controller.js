"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_service_1 = require("./user.service");
const appError_1 = require("../../utils/appError");
const logging_1 = require("../../utils/logging");
const userService = new user_service_1.UserService();
class UserController {
    checkUser = (req) => {
        const user = req.user;
        if (!user) {
            (0, logging_1.log)('warn', 'Attempt to access profile failed: User not found');
            throw new appError_1.AppError('User not found', 404);
        }
        return user;
    };
    getMe = (0, express_async_handler_1.default)(async (req, res) => {
        const user = this.checkUser(req);
        const me = await userService.getUserById(user._id);
        (0, logging_1.log)('info', `User profile retrieved for userId: ${user._id}`);
        res.status(200).json({
            status: 'success',
            data: me,
        });
    });
    updateMe = (0, express_async_handler_1.default)(async (req, res) => {
        const user = this.checkUser(req);
        const updatedUser = await userService.updateUser(user._id, req.body);
        (0, logging_1.log)('info', `User profile updated for userId: ${user._id}`);
        res.status(200).json({
            status: 'success',
            data: updatedUser,
        });
    });
    deleteMe = (0, express_async_handler_1.default)(async (req, res) => {
        const user = this.checkUser(req);
        await userService.deleteUser(user._id);
        (0, logging_1.log)('info', `User account deleted for userId: ${user._id}`);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
    getAllUsers = (0, express_async_handler_1.default)(async (req, res) => {
        const users = await userService.getAllUsers(req);
        (0, logging_1.log)('info', 'All users retrieved successfully');
        res.status(200).json(users);
    });
    getUserById = (0, express_async_handler_1.default)(async (req, res) => {
        if (!req.params.id) {
            throw new appError_1.AppError('User ID is required', 400);
        }
        const user = await userService.getUserById(req.params.id);
        (0, logging_1.log)('info', `User profile retrieved for userId: ${req.params.id}`);
        res.status(200).json({
            status: 'success',
            data: user,
        });
    });
    updateUserById = (0, express_async_handler_1.default)(async (req, res) => {
        if (!req.params.id) {
            throw new appError_1.AppError('User ID is required', 400);
        }
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        (0, logging_1.log)('info', `User profile updated for userId: ${req.params.id}`);
        res.status(200).json({
            status: 'success',
            data: updatedUser,
        });
    });
    deleteUserById = (0, express_async_handler_1.default)(async (req, res) => {
        if (!req.params.id) {
            throw new appError_1.AppError('User ID is required', 400);
        }
        await userService.deleteUser(req.params.id);
        (0, logging_1.log)('info', `User account deleted for userId: ${req.params.id}`);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map