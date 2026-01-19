import { Request, Response, NextFunction } from "express";
import productModel from "../models/product.model";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { CategorySubCategoryMap } from "../utils/categoryMap";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "../utils/message";

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;

        const {
            title,
            description,
            price,
            address,
            category,
            subCategory,
            lat,
            lng,
        } = req.body;

        if ((lat && !lng) || (!lat && lng)) {
            return res.status(400).json({
                message: ERROR_RESPONSE.BOTH_LAT_LNG_REQUIRED,
            });
        }

        //CATEGORY → SUBCATEGORY VALIDATION 
        const allowedSubCategories = CategorySubCategoryMap[category];

        if (!allowedSubCategories) {
            return res.status(400).json({
                message: ERROR_RESPONSE.INVALID_CATEGORY,
            });
        }

        if (!allowedSubCategories.includes(subCategory)) {
            return res.status(400).json({
                message: ERROR_RESPONSE.INVALID_SUBCATEGORY,
            });
        }

       // FILE VALIDATION 
        const files = req.files as {
            images?: Express.Multer.File[];
            videos?: Express.Multer.File[];
        };

        if (!files?.images || files.images.length < 3) {
            return res.status(400).json({
                message: ERROR_RESPONSE.MIN_PRODUCT_IMAGES,
            });
        }

       //UPLOAD IMAGES 
        const imageUrls: string[] = [];

        for (const file of files.images) {
            const uploaded = await uploadToCloudinary(
                file.buffer,
                "stillo/products/images",
                "image"
            );
            imageUrls.push(uploaded.secure_url);
        }

        // UPLOAD VIDEOS (OPTIONAL) 
        const videoUrls: string[] = [];

        if (files.videos?.length) {
            for (const file of files.videos) {
                const uploaded = await uploadToCloudinary(
                    file.buffer,
                    "stillo/products/videos",
                    "video"
                );
                videoUrls.push(uploaded.secure_url);
            }
        }

        const product = await productModel.create({
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
            message: SUCCESS_RESPONSE.PRODUCT_CREATED,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// GET ALL PRODUCTS
export const getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await productModel
            .find({ isActive: true })
            .sort({ createdAt: -1 })
            .populate("seller", "phoneNumber role")
            .lean();

        return res.status(200).json({
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

// GET PRODUCT BY ID
export const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { productId } = req.params;

        const product = await productModel
            .findById(productId)
            .populate("seller", "phoneNumber role")
            .lean();

        if (!product) {
            return res.status(404).json({
                message: ERROR_RESPONSE.PRODUCT_NOT_FOUND,
            });
        }

        return res.status(200).json({
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// EDIT PRODUCT
export const editProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const { productId } = req.params;

        const {
            title,
            description,
            price,
            address,
            category,
            subCategory,
        } = req.body;

        const product = await productModel.findOne({
            _id: productId,
            seller: user._id,
        });

        if (!product) {
            return res.status(404).json({
                message: ERROR_RESPONSE.PRODUCT_NOT_FOUND,
            });
        }

        if (price && price < 45) {
            return res.status(400).json({
                message: ERROR_RESPONSE.MIN_PRODUCT_PRICE,
            });
        }

        // Update only provided fields
        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;
        if (address) product.address = address;
        if (category) product.category = category;
        if (subCategory) product.subCategory = subCategory;

        await product.save();

        return res.status(200).json({
            message: SUCCESS_RESPONSE.PRODUCT_UPDATED,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// DELETE PRODUCT 
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const { productId } = req.params;

        const product = await productModel.findOne({
            _id: productId,
            seller: user._id,
        });

        if (!product) {
            return res.status(404).json({
                message: ERROR_RESPONSE.PRODUCT_NOT_FOUND,
            });
        }

        product.isActive = false;
        await product.save();

        return res.status(200).json({
            message: SUCCESS_RESPONSE.PRODUCT_DELETED,
        });
    } catch (error) {
        next(error);
    }
};

