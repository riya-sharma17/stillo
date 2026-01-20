import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import { SUCCESS_RESPONSE, ERROR_RESPONSE } from "../utils/message";
import productModel from "../models/product.model";

// SET INITIAL LOCATION (CURRENT LOCATION ONLY)
export const setInitialLocation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const { lat, lng, address } = req.body;

        const currentUser = await userModel.findById(user._id);

        if (!currentUser) {
            return res.status(404).json({
                message: ERROR_RESPONSE.USER_NOT_FOUND,
            });
        }

        await userModel.updateOne(
            { _id: user._id },
            {
                $set: {
                    location: { lat, lng, address },
                },
            }
        );

        return res.status(200).json({
            message: SUCCESS_RESPONSE.LOCATION_UPDATED,
        });
    } catch (error) {
        next(error);
    }
};

// GET SAVED ADDRESSES
export const getAddresses = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userModel
            .findById(res.locals.user._id)
            .select("addresses")
            .lean();

        return res.status(200).json({
            message: SUCCESS_RESPONSE.ADDRESSES_FETCHED,
            data: user?.addresses || [],
        });
    } catch (error) {
        next(error);
    }
};

// ADD ADDRESS
export const addAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const { label, lat, lng, address, makeDefault } = req.body;

        const currentUser = await userModel.findById(user._id);

        if ((lat && !lng) || (!lat && lng)) {
            return res.status(400).json({
                message: ERROR_RESPONSE.BOTH_LAT_LNG_REQUIRED,
            });
        }

        if (!currentUser) {
            return res.status(404).json({
                message: ERROR_RESPONSE.USER_NOT_FOUND,
            });
        }

        const hasAddresses =
            Array.isArray(currentUser.addresses) &&
            currentUser.addresses.length > 0;

        const shouldBeDefault = !hasAddresses || makeDefault === true;

        // Unset previous default ONLY if addresses exist
        if (hasAddresses && shouldBeDefault) {
            await userModel.updateOne(
                { _id: user._id },
                { $set: { "addresses.$[].isDefault": false } }
            );
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            {
                $push: {
                    addresses: {
                        label,
                        lat,
                        lng,
                        address,
                        isDefault: shouldBeDefault,
                    },
                },
            },
            { new: true }
        );

        return res.status(201).json({
            message: SUCCESS_RESPONSE.ADDRESS_ADDED,
            data: updatedUser?.addresses || [],
        });
    } catch (error) {
        next(error);
    }
};

// DELETE ADDRESS
export const deleteAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const { addressId } = req.params;

        const currentUser = await userModel.findById(user._id).lean();

        if (!currentUser || !currentUser.addresses?.length) {
            return res.status(404).json({
                message: ERROR_RESPONSE.ADDRESS_NOT_FOUND,
            });
        }

        const addressToDelete = currentUser.addresses.find(
            (a: any) => a._id.toString() === addressId
        );

        if (!addressToDelete) {
            return res.status(404).json({
                message: ERROR_RESPONSE.ADDRESS_NOT_FOUND,
            });
        }

        // Remove the address
        await userModel.updateOne(
            { _id: user._id },
            { $pull: { addresses: { _id: addressId } } }
        );

        // If deleted address was default → assign new default
        if (addressToDelete.isDefault) {
            await userModel.updateOne(
                { _id: user._id, "addresses.0": { $exists: true } },
                { $set: { "addresses.0.isDefault": true } }
            );
        }

        return res.status(200).json({
            message: SUCCESS_RESPONSE.ADDRESS_DELETED,
        });
    } catch (error) {
        next(error);
    }
};

// SET DEFAULT ADDRESS
export const setDefaultAddress = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const { addressId } = req.params;

        const exists = await userModel.findOne({
            _id: user._id,
            "addresses._id": addressId,
        });

        if (!exists) {
            return res.status(404).json({
                message: ERROR_RESPONSE.ADDRESS_NOT_FOUND,
            });
        }
        
        const usedInProduct = await productModel.exists({ addressId });

        if (usedInProduct) {
            return res.status(400).json({
                message: ERROR_RESPONSE.ADDRESS_USED_IN_PRODUCT,
            });
        }

        // unset previous default
        await userModel.updateOne(
            { _id: user._id },
            { $set: { "addresses.$[].isDefault": false } }
        );

        // set selected address as default
        await userModel.updateOne(
            { _id: user._id, "addresses._id": addressId },
            { $set: { "addresses.$.isDefault": true } }
        );

        return res.status(200).json({
            message: SUCCESS_RESPONSE.DEFAULT_ADDRESS_UPDATED,
        });
    } catch (error) {
        next(error);
    }
};
