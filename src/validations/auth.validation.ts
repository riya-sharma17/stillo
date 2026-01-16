import Joi from "joi";

const phoneSchema = Joi.string()
  .pattern(/^[6-9]\d{9}$/)
  .required()
  .messages({
    "string.empty": "Phone number is required",
    "string.pattern.base": "Invalid phone number",
  });


const otpSchema = Joi.string()
  .length(4)
  .pattern(/^\d+$/)
  .required()
  .messages({
    "string.empty": "OTP is required",
    "string.length": "OTP must be 4 digits",
  });

export const sendOtpValidation = Joi.object({
  phoneNumber: phoneSchema,
});

export const verifyOtpValidation = Joi.object({
  phoneNumber: phoneSchema,
  otp: otpSchema,
});
