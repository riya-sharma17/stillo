"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_RESPONSE = exports.SUCCESS_RESPONSE = void 0;
exports.SUCCESS_RESPONSE = {
    OTP_SENT: "OTP sent successfully",
    OTP_VERIFIED: "Authentication successful",
    USER_FETCHED: "User fetched successfully",
    USERS_FETCHED: "Users fetched successfully",
    USER_DELETED: "User account deleted successfully",
};
exports.ERROR_RESPONSE = {
    PHONE_REQUIRED: "Phone number is required",
    INVALID_OTP: "Invalid OTP",
    FORBIDDEN_ACCESS: "You do not have permission to access this resource",
    UNAUTHORIZED: "Unauthorized access",
};
//# sourceMappingURL=message.js.map