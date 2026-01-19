"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("./cloudinary"));
const uploadToCloudinary = (buffer, folder, resourceType) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.default.uploader.upload_stream({
            folder,
            resource_type: resourceType,
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        }).end(buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=uploadToCloudinary.js.map