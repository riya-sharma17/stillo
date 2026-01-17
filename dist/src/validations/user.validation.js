"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.listUsersValidation = joi_1.default.object({
    page: joi_1.default.number()
        .integer()
        .min(1)
        .default(1),
    limit: joi_1.default.number()
        .integer()
        .min(1)
        .max(100)
        .default(10),
    search: joi_1.default.string()
        .allow("")
        .optional(),
});
//# sourceMappingURL=user.validation.js.map