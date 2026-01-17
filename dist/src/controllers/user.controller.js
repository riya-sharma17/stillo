"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMe = exports.listUsers = exports.getMe = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const message_1 = require("../utils/message");
//GET CURRENT USER
const getMe = async (req, res, next) => {
    try {
        const user = res.locals.user;
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.USER_FETCHED,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
// LIST USERS (ADMIN ONLY)
const listUsers = async (req, res, next) => {
    try {
        let { page = 1, limit = 10, search = "" } = req.query;
        page = Number(page);
        limit = Number(limit);
        const query = {};
        if (search) {
            query.$or = [
                { phoneNumber: { $regex: search, $options: "i" } },
            ];
        }
        const total = await user_model_1.default.countDocuments(query);
        const users = await user_model_1.default
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.USERS_FETCHED,
            data: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                users,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.listUsers = listUsers;
// DELETE OWN ACCOUNT
const deleteMe = async (req, res, next) => {
    try {
        const user = res.locals.user;
        if (!user?._id) {
            return res.status(401).json({
                message: message_1.ERROR_RESPONSE.UNAUTHORIZED,
            });
        }
        await user_model_1.default.findByIdAndDelete(user._id);
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.USER_DELETED,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMe = deleteMe;
//# sourceMappingURL=user.controller.js.map