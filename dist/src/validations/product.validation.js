"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIdParamValidation = exports.editProductValidation = exports.createProductValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
const latLngTogether = (value, helpers) => {
    const { lat, lng } = value;
    if ((lat && !lng) || (!lat && lng)) {
        return helpers.error("any.custom");
    }
    return value;
};
exports.createProductValidation = joi_1.default.object({
    title: joi_1.default.string()
        .min(3)
        .max(100)
        .required()
        .messages({
        "string.empty": "Product title is required",
    }),
    description: joi_1.default.string()
        .min(10)
        .max(2000)
        .required()
        .messages({
        "string.empty": "Product description is required",
    }),
    price: joi_1.default.number().min(0).required(),
    address: joi_1.default.string()
        .min(5)
        .required()
        .messages({
        "string.empty": "Address is required",
    }),
    category: joi_1.default.string()
        .valid(...Object.values(enum_1.ProductCategory))
        .required()
        .messages({
        "any.only": "Invalid product category",
    }),
    subCategory: joi_1.default.string()
        .required()
        .messages({
        "string.empty": "Sub-category is required",
    }),
    lat: joi_1.default.number().optional(),
    lng: joi_1.default.number().optional(),
})
    .custom(latLngTogether)
    .messages({
    "any.custom": "Both latitude and longitude must be provided together",
});
exports.editProductValidation = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).optional(),
    description: joi_1.default.string().min(10).max(2000).optional(),
    price: joi_1.default.number()
        .min(45)
        .optional()
        .messages({
        "number.base": "Price must be a number",
        "any.required": "Price is required"
    }),
    address: joi_1.default.string().min(5).optional(),
    category: joi_1.default.string()
        .valid(...Object.values(enum_1.ProductCategory))
        .optional(),
    subCategory: joi_1.default.string().optional(),
});
exports.productIdParamValidation = joi_1.default.object({
    productId: joi_1.default.string()
        .length(24)
        .hex()
        .required()
        .messages({
        "string.length": "Invalid product id",
    }),
});
//# sourceMappingURL=product.validation.js.map