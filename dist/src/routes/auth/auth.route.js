"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/auth.controller");
const validation_1 = require("../../validations/validation");
const auth_validation_1 = require("../../validations/auth.validation");
const router = express_1.default.Router();
router.post("/send-otp", (0, validation_1.validateRequest)(auth_validation_1.sendOtpValidation), auth_controller_1.sendOtp);
router.post("/verify-otp", (0, validation_1.validateRequest)(auth_validation_1.verifyOtpValidation), auth_controller_1.verifyOtp);
exports.default = router;
//# sourceMappingURL=auth.route.js.map