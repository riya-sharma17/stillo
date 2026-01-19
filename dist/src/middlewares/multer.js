"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const regex_1 = require("../utils/regex");
const message_1 = require("../utils/message");
const fileFilter = (_req, file, cb) => {
    if (regex_1.imageMimeRegex.test(file.mimetype) ||
        regex_1.videoMimeRegex.test(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(message_1.ERROR_RESPONSE.FILE_UPLOAD_ERROR));
    }
};
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024,
    },
});
exports.default = upload;
//# sourceMappingURL=multer.js.map