"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_RESPONSE = exports.SUCCESS_RESPONSE = void 0;
exports.SUCCESS_RESPONSE = {
    OTP_SENT: "OTP sent successfully",
    OTP_VERIFIED: "Authentication successful",
    USER_FETCHED: "User fetched successfully",
    USERS_FETCHED: "Users fetched successfully",
    USER_DELETED: "User account deleted successfully",
    ADDRESS_ADDED: "Address added successfully",
    ADDRESS_DELETED: "Address deleted successfully",
    ADDRESSES_FETCHED: "Addresses fetched successfully",
    DEFAULT_ADDRESS_UPDATED: "Default address updated successfully",
    INITIAL_LOCATION_SET: "Initial location set successfully",
    LOCATION_UPDATED: "Location updated successfully",
};
exports.ERROR_RESPONSE = {
    PHONE_REQUIRED: "Phone number is required",
    INVALID_OTP: "Invalid OTP",
    FORBIDDEN_ACCESS: "You do not have permission to access this resource",
    UNAUTHORIZED: "Unauthorized access",
    ADDRESS_NOT_FOUND: "Address not found",
    USER_NOT_FOUND: "User not found",
};
//# sourceMappingURL=message.js.map