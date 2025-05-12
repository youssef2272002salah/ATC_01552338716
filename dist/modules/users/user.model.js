"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const crypto_1 = __importDefault(require("crypto"));
const UserSchema = new mongoose_1.Schema({
    providerId: {
        type: String,
        unique: true,
        sparse: true,
    },
    provider: {
        type: String,
        enum: ['google', 'facebook'],
        sparse: true,
    },
    fullname: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please add a valid email'],
    },
    password: {
        type: String,
        required: function () {
            return !this.provider; // Only required if not using Google/Facebook
        },
        select: false,
    },
    phone: {
        type: String,
        default: '1234567890',
    },
    country: {
        type: String,
        default: 'US',
    },
    phoneCode: {
        type: String,
        default: '+1',
    },
    pic: {
        type: 'String',
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, { timestamps: true });
// Indexing for faster lookups
// UserSchema.index({ email: 1 }, { unique: true });
// UserSchema.index({ fullname: 1 });
// UserSchema.index({ phone: 1 });
// UserSchema.index({ providerId: 1 }, { unique: true, sparse: true });
// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt_1.default.genSalt(12);
    this.password = await bcrypt_1.default.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
});
UserSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew)
        return next();
    this.passwordChangedAt = new Date(Date.now() - 1000);
    next();
});
// Method to compare passwords
UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt_1.default.compare(candidatePassword, userPassword);
};
// Method to create a password reset token
UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};
// Static method to find user by email
UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email }).select('+password');
};
// Remove sensitive data before returning user object
UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.passwordResetToken;
    delete obj.passwordResetExpires;
    delete obj.verificationToken;
    return obj;
};
exports.UserModel = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map