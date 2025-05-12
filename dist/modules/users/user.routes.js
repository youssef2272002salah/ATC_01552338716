"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const validateDto_1 = require("../../utils/validateDto");
const users_dto_1 = require("./users.dto");
const userController = new user_controller_1.UserController();
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
// User Profile
userRouter.get('/me', auth_middleware_1.protect, userController.getMe);
userRouter.patch('/me', auth_middleware_1.protect, (0, validateDto_1.validateDto)(users_dto_1.UpdateUserDto), userController.updateMe);
userRouter.delete('/me', auth_middleware_1.protect, userController.deleteMe);
userRouter.get('/', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), userController.getAllUsers);
// Admin Routes
userRouter.get('/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), userController.getUserById);
userRouter.delete('/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), userController.deleteUserById);
userRouter.patch('/:id', auth_middleware_1.protect, (0, auth_middleware_1.restrictTo)('admin'), (0, validateDto_1.validateDto)(users_dto_1.UpdateUserDto), userController.updateUserById);
//# sourceMappingURL=user.routes.js.map