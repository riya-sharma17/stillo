import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import userModel from "../models/user.model";
import { generateOTP, sendOTP } from "../utils/OTP";
import { Role, LoginType } from "../utils/enum";
import { SUCCESS_RESPONSE, ERROR_RESPONSE } from "../utils/message";

dotenv.config();

if (!process.env.PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY in environment variables.");
}

const generateToken = (user: any) => {
    return jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        process.env.PRIVATE_KEY as string,
        { expiresIn: "1d" }
    );
};

// ================= SEND OTP =================
export const sendOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { phoneNumber } = req.body;

        const otp = generateOTP();
        await sendOTP(phoneNumber, otp);

        return res.status(200).json({
            message: SUCCESS_RESPONSE.OTP_SENT,
        });
    } catch (error) {
        next(error);
    }
};

// ================= VERIFY OTP =================
export const verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { phoneNumber, otp } = req.body;

        if (otp !== "0000") {
            return res.status(401).json({
                message: ERROR_RESPONSE.INVALID_OTP,
            });
        }

        let user = await userModel.findOne({ phoneNumber });

        let isNewUser = false;

        if (!user) {

            // signup
            user = await userModel.create({
                phoneNumber,
                role: Role.USER,
                loginType: LoginType.NUMBER,
                isVerified: true,
            });
            isNewUser = true;
        }
        // login
        const token = generateToken(user);

        return res.status(200).json({
            message: SUCCESS_RESPONSE.OTP_VERIFIED,
            data: {
                token,
                user,
                isNewUser,
            },
        });
    } catch (error) {
        next(error);
    }
};
