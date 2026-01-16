import express from "express";

import {
    sendOtp,
    verifyOtp,
} from "../../controllers/auth.controller";

import {
    validateRequest,
} from "../../validations/validation";

import {
    sendOtpValidation,
    verifyOtpValidation,
} from "../../validations/auth.validation";

const router = express.Router();

router.post(
    "/send-otp",
    validateRequest(sendOtpValidation),
    sendOtp
);

router.post(
    "/verify-otp",
    validateRequest(verifyOtpValidation),
    verifyOtp
);

export default router;
