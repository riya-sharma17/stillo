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
exports.verifyOtp = exports.sendOtp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const user_model_1 = __importDefault(require("../models/user.model"));
const OTP_1 = require("../utils/OTP");
const enum_1 = require("../utils/enum");
const message_1 = require("../utils/message");
dotenv.config();
if (!process.env.PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY in environment variables.");
}
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        role: user.role,
    }, process.env.PRIVATE_KEY, { expiresIn: "1d" });
};
// ================= SEND OTP =================
const sendOtp = async (req, res, next) => {
    try {
        const { phoneNumber } = req.body;
        const otp = (0, OTP_1.generateOTP)();
        await (0, OTP_1.sendOTP)(phoneNumber, otp);
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.OTP_SENT,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sendOtp = sendOtp;
// ================= VERIFY OTP =================
const verifyOtp = async (req, res, next) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (otp !== "0000") {
            return res.status(401).json({
                message: message_1.ERROR_RESPONSE.INVALID_OTP,
            });
        }
        let user = await user_model_1.default.findOne({ phoneNumber });
        let isNewUser = false;
        if (!user) {
            // signup
            user = await user_model_1.default.create({
                phoneNumber,
                role: enum_1.Role.USER,
                loginType: enum_1.LoginType.NUMBER,
                isVerified: true,
            });
            isNewUser = true;
        }
        // login
        const token = generateToken(user);
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.OTP_VERIFIED,
            data: {
                token,
                user,
                isNewUser,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyOtp = verifyOtp;
//# sourceMappingURL=auth.controller.js.map