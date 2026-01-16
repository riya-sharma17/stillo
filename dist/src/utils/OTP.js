"use strict";
// import * as dotenv from "dotenv";
// import nodemailer from "nodemailer";
// import crypto from "crypto";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = exports.generateOTP = void 0;
// dotenv.config();
// export const generateOTP = (): string => {
//   return crypto.randomInt(100000, 999999).toString();
// };
// export const sendOTP = async (email: string, OTP: string) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_SERVICE_USER,
//       pass: process.env.EMAIL_APP_PASSWORD,
//     },
//   });
//   const mailOptions = {
//     from: process.env.EMAIL_SERVICE_USER,
//     to: email,
//     subject: "Your OTP",
//     text: `your otp is: ${OTP}`,
//   };
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);
//     return info;
//   } catch (error) {
//     console.error("Failed to send OTP email:", error);
//     throw error;
//   }
// };
// import * as dotenv from "dotenv";
// dotenv.config();
const generateOTP = () => {
    return "0000";
};
exports.generateOTP = generateOTP;
const sendOTP = async (_phoneNumber, _OTP) => {
    console.log("OTP bypassed. OTP = 0000");
    return;
};
exports.sendOTP = sendOTP;
//# sourceMappingURL=OTP.js.map