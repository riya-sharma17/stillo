"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultAddress = exports.deleteAddress = exports.addAddress = exports.getAddresses = exports.setInitialLocation = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const message_1 = require("../utils/message");
const product_model_1 = __importDefault(require("../models/product.model"));
// SET INITIAL LOCATION (CURRENT LOCATION ONLY)
const setInitialLocation = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { lat, lng, address } = req.body;
        const currentUser = await user_model_1.default.findById(user._id);
        if (!currentUser) {
            return res.status(404).json({
                message: message_1.ERROR_RESPONSE.USER_NOT_FOUND,
            });
        }
        await user_model_1.default.updateOne({ _id: user._id }, {
            $set: {
                location: { lat, lng, address },
            },
        });
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.LOCATION_UPDATED,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.setInitialLocation = setInitialLocation;
// GET SAVED ADDRESSES
const getAddresses = async (req, res, next) => {
    try {
        const user = await user_model_1.default
            .findById(res.locals.user._id)
            .select("addresses")
            .lean();
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.ADDRESSES_FETCHED,
            data: user?.addresses || [],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAddresses = getAddresses;
// ADD ADDRESS
const addAddress = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { label, lat, lng, address, makeDefault } = req.body;
        const currentUser = await user_model_1.default.findById(user._id);
        if ((lat && !lng) || (!lat && lng)) {
            return res.status(400).json({
                message: message_1.ERROR_RESPONSE.BOTH_LAT_LNG_REQUIRED,
            });
        }
        if (!currentUser) {
            return res.status(404).json({
                message: message_1.ERROR_RESPONSE.USER_NOT_FOUND,
            });
        }
        const hasAddresses = Array.isArray(currentUser.addresses) &&
            currentUser.addresses.length > 0;
        const shouldBeDefault = !hasAddresses || makeDefault === true;
        // Unset previous default ONLY if addresses exist
        if (hasAddresses && shouldBeDefault) {
            await user_model_1.default.updateOne({ _id: user._id }, { $set: { "addresses.$[].isDefault": false } });
        }
        const updatedUser = await user_model_1.default.findByIdAndUpdate(user._id, {
            $push: {
                addresses: {
                    label,
                    lat,
                    lng,
                    address,
                    isDefault: shouldBeDefault,
                },
            },
        }, { new: true });
        return res.status(201).json({
            message: message_1.SUCCESS_RESPONSE.ADDRESS_ADDED,
            data: updatedUser?.addresses || [],
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addAddress = addAddress;
// DELETE ADDRESS
const deleteAddress = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { addressId } = req.params;
        const currentUser = await user_model_1.default.findById(user._id).lean();
        if (!currentUser || !currentUser.addresses?.length) {
            return res.status(404).json({
                message: message_1.ERROR_RESPONSE.ADDRESS_NOT_FOUND,
            });
        }
        const addressToDelete = currentUser.addresses.find((a) => a._id.toString() === addressId);
        if (!addressToDelete) {
            return res.status(404).json({
                message: message_1.ERROR_RESPONSE.ADDRESS_NOT_FOUND,
            });
        }
        // Remove the address
        await user_model_1.default.updateOne({ _id: user._id }, { $pull: { addresses: { _id: addressId } } });
        // If deleted address was default → assign new default
        if (addressToDelete.isDefault) {
            await user_model_1.default.updateOne({ _id: user._id, "addresses.0": { $exists: true } }, { $set: { "addresses.0.isDefault": true } });
        }
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.ADDRESS_DELETED,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAddress = deleteAddress;
// SET DEFAULT ADDRESS
const setDefaultAddress = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { addressId } = req.params;
        const exists = await user_model_1.default.findOne({
            _id: user._id,
            "addresses._id": addressId,
        });
        if (!exists) {
            return res.status(404).json({
                message: message_1.ERROR_RESPONSE.ADDRESS_NOT_FOUND,
            });
        }
        const usedInProduct = await product_model_1.default.exists({ addressId });
        if (usedInProduct) {
            return res.status(400).json({
                message: message_1.ERROR_RESPONSE.ADDRESS_USED_IN_PRODUCT,
            });
        }
        // unset previous default
        await user_model_1.default.updateOne({ _id: user._id }, { $set: { "addresses.$[].isDefault": false } });
        // set selected address as default
        await user_model_1.default.updateOne({ _id: user._id, "addresses._id": addressId }, { $set: { "addresses.$.isDefault": true } });
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.DEFAULT_ADDRESS_UPDATED,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.setDefaultAddress = setDefaultAddress;
//# sourceMappingURL=address.controller.js.map