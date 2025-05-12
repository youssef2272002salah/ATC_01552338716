"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("./auth.middleware");
const validateDto_1 = require("../../utils/validateDto");
const auth_dto_1 = require("./auth.dto");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
const authController = new auth_controller_1.AuthController();
// Authentication
authRouter.post('/signup', (0, validateDto_1.validateDto)(auth_dto_1.SignupDto), authController.signup);
authRouter.post('/login', (0, validateDto_1.validateDto)(auth_dto_1.LoginDto), authController.login);
authRouter.get('/logout', auth_middleware_1.protect, authController.logout);
authRouter.post('/refresh', authController.refreshToken);
authRouter.post('/resend-verification-email', authController.resendVerificationEmail);
authRouter.get('/verify-email', authController.verifyEmail);
// Password Management
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.patch('/reset-password', (0, validateDto_1.validateDto)(auth_dto_1.ResetPasswordDto), authController.resetPassword);
authRouter.patch('/update-password', auth_middleware_1.protect, authController.updatePassword);
//# sourceMappingURL=auth.routes.js.map