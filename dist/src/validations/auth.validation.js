"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpValidation = exports.sendOtpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const phoneSchema = joi_1.default.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
    "string.empty": "Phone number is required",
    "string.pattern.base": "Invalid phone number",
});
const otpSchema = joi_1.default.string()
    .length(4)
    .pattern(/^\d+$/)
    .required()
    .messages({
    "string.empty": "OTP is required",
    "string.length": "OTP must be 4 digits",
});
exports.sendOtpValidation = joi_1.default.object({
    phoneNumber: phoneSchema,
});
exports.verifyOtpValidation = joi_1.default.object({
    phoneNumber: phoneSchema,
    otp: otpSchema,
});
//# sourceMappingURL=auth.validation.js.map