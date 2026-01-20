import { Request, Response, NextFunction } from "express";
import productModel from "../models/product.model";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { CategorySubCategoryMap } from "../utils/categoryMap";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "../utils/message";
import userModel from "../models/user.model";
import { ILocation } from "../interfaces/location.interface";
import { calculateDistanceAndETA } from "../utils/distance";

const getViewerLocation = async (
    req: Request,
    userId?: string
): Promise<ILocation | null> => {

    // live GPS 
    if (req.query.lat && req.query.lng) {
        return {
            lat: Number(req.query.lat),
            lng: Number(req.query.lng),
        };
    }

    // Logged-in user 
    if (userId) {
        const user = await userModel.findById(userId).lean();

        if (user?.location?.lat && user?.location?.lng) {
            return {
                lat: user.location.lat,
                lng: user.location.lng,
            };
        }

        const defaultAddress = user?.addresses?.find(a => a.isDefault);
        if (defaultAddress) {
            return {
                lat: defaultAddress.lat,
                lng: defaultAddress.lng,
            };
        }
    }

    return null;
};

// CREATE PRODUCT
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
            addressId,
            category,
            condition,
            subCategory,
        } = req.body;

        const allowedSubs = CategorySubCategoryMap[category];
        if (!allowedSubs || !allowedSubs.includes(subCategory)) {
            return res.status(400).json({
                message: ERROR_RESPONSE.INVALID_SUBCATEGORY,
            });
        }

        const addressExists = await userModel.findOne({
            _id: user._id,
            "addresses._id": addressId,
        });

        if (!addressExists) {
            return res.status(400).json({
                message: ERROR_RESPONSE.ADDRESS_NOT_FOUND,
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
            addressId,
            category,
            condition,
            subCategory,
            images: imageUrls,
            videos: videoUrls,
            seller: user._id
        });

        return res.status(201).json({
            message: SUCCESS_RESPONSE.PRODUCT_CREATED,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req:Request, res: Response, next: NextFunction) => {
  try {
    const viewerLocation = await getViewerLocation(
      req,
      res.locals.user?._id
    );

    const products = await productModel
      .find({ isActive: true })
      .select("title price category images location createdAt")
      .lean();

    const response = products.map(product => ({
      ...product,
      distance: viewerLocation && product.location
        ? calculateDistanceAndETA(viewerLocation, product.location)
        : null,
    }));

    return res.status(200).json({ data: response });
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
            .populate("seller")
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

