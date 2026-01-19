"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialLocationValidation = exports.addressIdParamValidation = exports.addAddressValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addAddressValidation = joi_1.default.object({
    label: joi_1.default.string()
        .required()
        .messages({
        "string.empty": "Label is required",
    }),
    lat: joi_1.default.number().optional(),
    lng: joi_1.default.number().optional(),
    address: joi_1.default.string().allow("").optional(),
    makeDefault: joi_1.default.boolean().optional(),
});
exports.addressIdParamValidation = joi_1.default.object({
    addressId: joi_1.default.string()
        .length(24)
        .hex()
        .required(),
});
exports.initialLocationValidation = joi_1.default.object({
    lat: joi_1.default.number().required(),
    lng: joi_1.default.number().required(),
    address: joi_1.default.string().optional(),
});
//# sourceMappingURL=address.validation.js.map