import Joi from "joi";
import { ProductCategory } from "../utils/enum";

const latLngTogether = (value: any, helpers: Joi.CustomHelpers) => {
    const { lat, lng } = value;

    if ((lat && !lng) || (!lat && lng)) {
        return helpers.error("any.custom");
    }

    return value;
};

export const createProductValidation = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "Product title is required",
        }),

    description: Joi.string()
        .min(10)
        .max(2000)
        .required()
        .messages({
            "string.empty": "Product description is required",
        }),

    price: Joi.number().min(0).required(),

    address: Joi.string()
        .min(5)
        .required()
        .messages({
            "string.empty": "Address is required",
        }),

    category: Joi.string()
        .valid(...Object.values(ProductCategory))
        .required()
        .messages({
            "any.only": "Invalid product category",
        }),

    subCategory: Joi.string()
        .required()
        .messages({
            "string.empty": "Sub-category is required",
        }),


    lat: Joi.number().optional(),
    lng: Joi.number().optional(),
})
    .custom(latLngTogether)
    .messages({
        "any.custom": "Both latitude and longitude must be provided together",
    });


export const editProductValidation = Joi.object({
    title: Joi.string().min(3).max(100).optional(),

    description: Joi.string().min(10).max(2000).optional(),

    price: Joi.number()
        .min(45)
        .optional()
        .messages({
            "number.base": "Price must be a number",
            "any.required": "Price is required"
        }),


    address: Joi.string().min(5).optional(),

    category: Joi.string()
        .valid(...Object.values(ProductCategory))
        .optional(),

    subCategory: Joi.string().optional(),
});

export const productIdParamValidation = Joi.object({
    productId: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            "string.length": "Invalid product id",
        }),
});
