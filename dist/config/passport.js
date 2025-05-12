"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const user_model_1 = require("../modules/users/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const console_1 = require("console");
dotenv_1.default.config();
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10000) || '7d',
    });
};
const authCallback = async (accessToken, refreshToken, profile, done) => {
    try {
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
            throw new Error('Google OAuth environment variables are missing.');
        }
        const email = profile.emails?.[0]?.value;
        const fullname = profile.displayName ||
            `${profile.name?.givenName || ''} ${profile.name?.familyName || ''}`.trim() ||
            'Anonymous User';
        if (!fullname.trim()) {
            return done(null, false, { message: 'Please add a name' });
        }
        let user = await user_model_1.UserModel.findOne({ email });
        if (!user) {
            user = await user_model_1.UserModel.create({
                fullname,
                email,
                providerId: profile.id,
                provider: profile.provider,
                role: 'user',
                isVerified: true,
            });
        }
        const token = signToken(user._id.toString());
        return done(null, { user, token });
    }
    catch (error) {
        (0, console_1.log)('error', error.message);
        return done(error, null);
    }
};
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, authCallback));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'name', 'emails'],
}, authCallback));
//# sourceMappingURL=passport.js.map