"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const enum_1 = require("../utils/enum");
const message_1 = require("../utils/message");
const isAdmin = (req, res, next) => {
    const user = res.locals.user;
    if (!user || user.role !== enum_1.Role.ADMIN) {
        return res.status(403).json({
            message: message_1.ERROR_RESPONSE.FORBIDDEN_ACCESS,
        });
    }
    next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAdmin.js.map