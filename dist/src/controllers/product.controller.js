"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const uploadToCloudinary_1 = require("../utils/uploadToCloudinary");
const categoryMap_1 = require("../utils/categoryMap");
const message_1 = require("../utils/message");
const createProduct = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { title, description, price, address, category, subCategory, lat, lng, } = req.body;
        if ((lat && !lng) || (!lat && lng)) {
            return res.status(400).json({
                message: message_1.ERROR_RESPONSE.BOTH_LAT_LNG_REQUIRED,
            });
        }
        //CATEGORY → SUBCATEGORY VALIDATION 
        const allowedSubCategories = categoryMap_1.CategorySubCategoryMap[category];
        if (!allowedSubCategories) {
            return res.status(400).json({
                message: message_1.ERROR_RESPONSE.INVALID_CATEGORY,
            });
        }
        if (!allowedSubCategories.includes(subCategory)) {
            return res.status(400).json({
                message: message_1.ERROR_RESPONSE.INVALID_SUBCATEGORY,
            });
        }
        // FILE VALIDATION 
        const files = req.files;
        if (!files?.images || files.images.length < 3) {
            return res.status(400).json({
                message: message_1.ERROR_RESPONSE.MIN_PRODUCT_IMAGES,
            });
        }
        //UPLOAD IMAGES 
        const imageUrls = [];
        for (const file of files.images) {
            const uploaded = await (0, uploadToCloudinary_1.uploadToCloudinary)(file.buffer, "stillo/products/images", "image");
            imageUrls.push(uploaded.secure_url);
        }
        // UPLOAD VIDEOS (OPTIONAL) 
        const videoUrls = [];
        if (files.videos?.length) {
            for (const file of files.videos) {
                const uploaded = await (0, uploadToCloudinary_1.uploadToCloudinary)(file.buffer, "stillo/products/videos", "video");
                videoUrls.push(uploaded.secure_url);
            }
        }
        const product = await product_model_1.default.create({
            title,
            description,
            price,
            address,
            category,
            subCategory,
            images: imageUrls,
            videos: videoUrls,
            seller: user._id,
            location: lat && lng ? { lat, lng } : undefined,
        });
        return res.status(201).json({
            message: message_1.SUCCESS_RESPONSE.PRODUCT_CREATED,
            data: product,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
// GET ALL PRODUCTS
const getAllProducts = async (req, res, next) => {
    try {
        const products = await product_model_1.default
            .find({ isActive: true })
            .sort({ createdAt: -1 })
            .populate("seller", "phoneNumber role")
            .lean();
        return res.status(200).json({
            data: products,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProducts = getAllProducts;
// GET PRODUCT BY ID
const getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await product_model_1.default
            .findById(productId)
            .populate("seller", "phoneNumber role")
            .lean();
        if (!product) {
            return res.status(404).json({
                message: message_1.ERROR_RESPONSE.PRODUCT_NOT_FOUND,
            });
        }
        return res.status(200).json({
            data: product,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
// EDIT PRODUCT
const editProduct = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { productId } = req.params;
        const { title, description, price, address, category, subCategory, } = req.body;
        const product = await product_model_1.default.findOne({
            _id: productId,
            seller: user._id,
        });
        if (!product) {
            return res.status(404).json({
                message: message_1.ERROR_RESPONSE.PRODUCT_NOT_FOUND,
            });
        }
        if (price && price < 45) {
            return res.status(400).json({
                message: message_1.ERROR_RESPONSE.MIN_PRODUCT_PRICE,
            });
        }
        // Update only provided fields
        if (title)
            product.title = title;
        if (description)
            product.description = description;
        if (price)
            product.price = price;
        if (address)
            product.address = address;
        if (category)
            product.category = category;
        if (subCategory)
            product.subCategory = subCategory;
        await product.save();
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.PRODUCT_UPDATED,
            data: product,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editProduct = editProduct;
// DELETE PRODUCT 
const deleteProduct = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { productId } = req.params;
        const product = await product_model_1.default.findOne({
            _id: productId,
            seller: user._id,
        });
        if (!product) {
            return res.status(404).json({
                message: message_1.ERROR_RESPONSE.PRODUCT_NOT_FOUND,
            });
        }
        product.isActive = false;
        await product.save();
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.PRODUCT_DELETED,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.controller.js.map