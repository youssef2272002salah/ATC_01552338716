"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_service_1 = require("./auth.service");
const logging_1 = require("../../utils/logging");
const authService = new auth_service_1.AuthService();
class AuthController {
    googleAuthCallback = (0, express_async_handler_1.default)(async (req, res) => {
        (0, logging_1.log)('info', 'Google authentication callback received');
        const user = req.user;
        res.status(200).json({ status: 'success', data: user });
    });
    facebookAuthCallback = (0, express_async_handler_1.default)(async (req, res) => {
        (0, logging_1.log)('info', 'Facebook authentication callback received');
        const user = req.user;
        res.status(200).json({ status: 'success', data: user });
    });
    signup = (0, express_async_handler_1.default)(async (req, res) => {
        (0, logging_1.log)('info', 'Signup request received', { email: req.body.email });
        const user = await authService.signup(req.body, res);
        (0, logging_1.log)('info', 'Signup successful');
        res.status(201).json({
            status: 'success',
            message: 'Signup successful! Please verify your email.',
            user,
        });
    });
    login = (0, express_async_handler_1.default)(async (req, res) => {
        (0, logging_1.log)('info', 'Login request received', { email: req.body.email });
        const user = await authService.login(req.body, res);
        (0, logging_1.log)('info', 'Login successful');
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: user,
        });
    });
    logout = (0, express_async_handler_1.default)(async (req, res) => {
        (0, logging_1.log)('info', 'Logout request received');
        await authService.logout(res);
        (0, logging_1.log)('info', 'Logout successful');
        res.status(200).json({ message: 'Logout successful' });
    });
    refreshToken = (0, express_async_handler_1.default)(async (req, res) => {
        (0, logging_1.log)('info', 'Refresh token request received');
        const newAccessToken = await authService.refreshToken(req, res);
        (0, logging_1.log)('info', 'Refresh token successful');
        res.status(200).json({ accessToken: newAccessToken });
    });
    verifyEmail = (0, express_async_handler_1.default)(async (req, res) => {
        const token = req.query.token;
        (0, logging_1.log)('info', 'Email verification requested', { token });
        await authService.verifyEmail(token);
        (0, logging_1.log)('info', 'Email verified successfully');
        res.status(200).json({ message: 'Email verified successfully' });
    });
    resendVerificationEmail = (0, express_async_handler_1.default)(async (req, res) => {
        (0, logging_1.log)('info', 'Resend verification email request received', { email: req.body.email });
        await authService.resendVerificationEmail(req.body.email);
        (0, logging_1.log)('info', 'Verification email resent successfully', { email: req.body.email });
        res.status(200).json({ message: 'Verification email sent successfully' });
    });
    forgotPassword = (0, express_async_handler_1.default)(async (req, res) => {
        (0, logging_1.log)('info', 'Forgot password request received', { email: req.body.email });
        const result = await authService.forgotPassword(req.body.email);
        (0, logging_1.log)('info', 'Forgot password process completed', { email: req.body.email });
        res.status(200).json({ status: 'success', data: result });
    });
    resetPassword = (0, express_async_handler_1.default)(async (req, res) => {
        (0, logging_1.log)('info', 'Reset password request received', { email: req.body.email });
        const result = await authService.resetPassword(req.body, res);
        (0, logging_1.log)('info', 'Password reset successful', { email: req.body.email });
        res.status(200).json({ status: 'success', data: result });
    });
    // todo: type any
    updatePassword = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.user;
        if (!user) {
            (0, logging_1.log)('warn', 'Update password attempt without authentication');
            return res.status(401).json({ message: 'User not authenticated' });
        }
        (0, logging_1.log)('info', 'Update password request received', { userId: user.id });
        const result = await authService.updatePassword(user.id, req.body, res);
        (0, logging_1.log)('info', 'Password update successful', { userId: user.id });
        res.status(200).json({ status: 'success', data: result });
    });
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map