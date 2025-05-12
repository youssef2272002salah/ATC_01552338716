import { Router } from 'express';
import { AuthController } from './auth.controller';
import { protect } from './auth.middleware';
import { validateDto } from '../../utils/validateDto';
import { LoginDto, ResetPasswordDto, SignupDto } from './auth.dto';

const authRouter = Router();
const authController = new AuthController();
// Authentication
authRouter.post('/signup', validateDto(SignupDto), authController.signup);
authRouter.post('/login', validateDto(LoginDto), authController.login);
authRouter.get('/logout', protect, authController.logout);
authRouter.post('/refresh', authController.refreshToken);

authRouter.post('/resend-verification-email', authController.resendVerificationEmail);
authRouter.get('/verify-email', authController.verifyEmail);

// Password Management
authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.patch('/reset-password', validateDto(ResetPasswordDto), authController.resetPassword);
authRouter.patch('/update-password', protect, authController.updatePassword);

export { authRouter };
