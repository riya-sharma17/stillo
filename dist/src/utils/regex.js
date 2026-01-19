"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfExtRegex = exports.videoExtRegex = exports.imageExtRegex = exports.videoMimeRegex = exports.imageMimeRegex = void 0;
// for mimetype checks
exports.imageMimeRegex = /^image\/(jpeg|jpg|png|gif|webp)$/i;
exports.videoMimeRegex = /^video\/(mp4|mov|avi|webm|mkv)$/i;
exports.imageExtRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
exports.videoExtRegex = /\.(mp4|mov|avi|webm|mkv)$/i;
exports.pdfExtRegex = /\.pdf$/i;
//# sourceMappingURL=regex.js.map