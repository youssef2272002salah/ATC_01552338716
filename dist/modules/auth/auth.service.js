"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../users/user.model");
const mailer_1 = __importDefault(require("../../utils/mailer"));
const appError_1 = require("../../utils/appError");
const logging_1 = require("../../utils/logging");
class AuthService {
    signAccessToken(id) {
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: '15m',
        });
    }
    signRefreshToken(id) {
        return jsonwebtoken_1.default.sign({ id }, process.env.REFRESH_SECRET || 'refresh_secret', {
            expiresIn: '7d',
        });
    }
    createSendToken(user, res) {
        const userId = user?._id?.toString() || user?.id?.toString();
        console.log(userId);
        const accessToken = this.signAccessToken(userId);
        const refreshToken = this.signRefreshToken(userId);
        (0, logging_1.log)('info', '[AuthService] Tokens created', { userId: user._id });
        // Set refresh token in HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return {
            _id: user._id || user.id,
            fullname: user.fullname,
            email: user.email,
            pic: user.pic,
            role: user.role,
            accessToken,
        };
    }
    async signup(userDto, res) {
        (0, logging_1.log)('info', '[AuthService] Signup attempt', { email: userDto.email });
        const newUser = await user_model_1.UserModel.create({ ...userDto });
        (0, logging_1.log)('info', '[AuthService] User created', { userId: newUser._id });
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        newUser.verificationToken = verificationToken;
        await newUser.save({ validateBeforeSave: false });
        const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;
        const emailData = mailer_1.default.generateVerificationEmail(newUser.email, verificationLink);
        await mailer_1.default.sendEmail(emailData);
        (0, logging_1.log)('info', '[AuthService] Verification email sent', { email: newUser.email });
        return this.createSendToken(newUser, res);
    }
    async login({ email, password }, res) {
        (0, logging_1.log)('info', '[AuthService] Login attempt', { email });
        const user = await user_model_1.UserModel.findOne({ email }).select('+password');
        if (!user || !user.password || !(await bcryptjs_1.default.compare(password, user.password))) {
            (0, logging_1.log)('warn', '[AuthService] Invalid login attempt', { email });
            throw new appError_1.AppError('Invalid email or password', 401);
        }
        if (!user.isVerified) {
            const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
            user.verificationToken = verificationToken;
            await user.save({ validateBeforeSave: false });
            const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;
            const emailData = mailer_1.default.generateVerificationEmail(user.email, verificationLink);
            await mailer_1.default.sendEmail(emailData);
            (0, logging_1.log)('warn', '[AuthService] Email not verified, verification email sent', { email });
            throw new appError_1.AppError('Email not verified. Verification email sent', 401);
        }
        (0, logging_1.log)('info', '[AuthService] Login successful', { userId: user._id });
        return this.createSendToken(user, res);
    }
    async logout(res) {
        (0, logging_1.log)('info', '[AuthService] Logout');
        res.cookie('refreshToken', '', {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'strict',
            path: '/',
        });
        return;
    }
    async refreshToken(req, res) {
        const token = req.cookies.refreshToken;
        if (!token) {
            (0, logging_1.log)('warn', '[AuthService] No refresh token provided');
            throw new appError_1.AppError('No refresh token provided', 403);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_SECRET || 'refresh_secret');
        const user = await user_model_1.UserModel.findById(decoded.id);
        if (!user) {
            (0, logging_1.log)('warn', '[AuthService] Invalid refresh token');
            throw new appError_1.AppError('Invalid refresh token', 403);
        }
        (0, logging_1.log)('info', '[AuthService] Refresh token validated', { userId: user._id });
        const newAccessToken = this.signAccessToken(user._id.toString());
        return newAccessToken;
    }
    async verifyEmail(token) {
        (0, logging_1.log)('info', '[AuthService] Email verification attempt', { token });
        const user = await user_model_1.UserModel.findOne({ verificationToken: token });
        if (!user) {
            (0, logging_1.log)('warn', '[AuthService] Invalid verification token', { token });
            throw new appError_1.AppError('Invalid verification token', 400);
        }
        user.verificationToken = undefined;
        user.isVerified = true;
        await user.save();
        (0, logging_1.log)('info', '[AuthService] Email verified successfully', { userId: user._id });
        return { message: 'Email successfully verified' };
    }
    async resendVerificationEmail(email) {
        const user = await user_model_1.UserModel.findOne({
            email,
            isVerified: false,
        });
        if (!user) {
            throw new appError_1.AppError('User not found or already verified', 404);
        }
        const verificationToken = crypto_1.default.randomBytes(32).toString('hex');
        user.verificationToken = verificationToken;
        await user.save({ validateBeforeSave: false });
        const verificationLink = `${process.env.BASE_URL}/auth/verify-email?token=${verificationToken}`;
        const emailData = mailer_1.default.generateVerificationEmail(user.email, verificationLink);
        await mailer_1.default.sendEmail(emailData);
    }
    async forgotPassword(email) {
        (0, logging_1.log)('info', '[AuthService] Forgot password request', { email });
        const user = await user_model_1.UserModel.findOne({ email });
        if (!user) {
            (0, logging_1.log)('warn', '[AuthService] User not found for forgot password', { email });
            throw new appError_1.AppError('User not found', 404);
        }
        const resetToken = crypto_1.default.randomBytes(8).toString('hex');
        user.passwordResetToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        const emailData = mailer_1.default.generateResetPasswordEmail(user.email, resetToken);
        await mailer_1.default.sendEmail(emailData);
        (0, logging_1.log)('info', '[AuthService] Password reset email sent', { email });
        return { message: 'Password reset token sent' };
    }
    async resetPassword(dto, res) {
        const hashedToken = crypto_1.default.createHash('sha256').update(dto.resetToken).digest('hex');
        const user = await user_model_1.UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: new Date() },
        });
        if (!user) {
            (0, logging_1.log)('warn', '[AuthService] Invalid reset token');
            throw new appError_1.AppError('Token is invalid or expired', 400);
        }
        user.password = dto.password;
        user.passwordConfirm = dto.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        return this.createSendToken(user, res);
    }
    async updatePassword(userId, dto, res) {
        const user = await user_model_1.UserModel.findById(userId).select('+password');
        if (!user) {
            (0, logging_1.log)('warn', '[AuthService] Update password attempt without authentication');
            throw new appError_1.AppError('User not authenticated', 401);
        }
        if (!user.password || !(await bcryptjs_1.default.compare(dto.password, user.password))) {
            (0, logging_1.log)('warn', '[AuthService] Invalid password update attempt', { userId });
            throw new appError_1.AppError('Invalid password', 401);
        }
        user.password = dto.password;
        user.passwordConfirm = dto.passwordConfirm;
        await user.save();
        return this.createSendToken(user, res);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map