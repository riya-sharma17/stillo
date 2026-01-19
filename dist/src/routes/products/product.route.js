"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtVerify_1 = require("../../middlewares/jwtVerify");
const validation_1 = require("../../validations/validation");
const product_validation_1 = require("../../validations/product.validation");
const product_controller_1 = require("../../controllers/product.controller");
const multer_1 = __importDefault(require("../../middlewares/multer"));
const router = (0, express_1.Router)();
// Get all active products
router.get("/", product_controller_1.getAllProducts);
// Get product by ID
router.get("/:productId", (0, validation_1.validateParams)(product_validation_1.productIdParamValidation), product_controller_1.getProductById);
// Create product
router.post("/create-product", jwtVerify_1.verifyJWT, multer_1.default.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 2 }
]), (0, validation_1.validateRequest)(product_validation_1.createProductValidation), product_controller_1.createProduct);
// Edit product 
router.put("/:productId", jwtVerify_1.verifyJWT, (0, validation_1.validateParams)(product_validation_1.productIdParamValidation), (0, validation_1.validateRequest)(product_validation_1.editProductValidation), product_controller_1.editProduct);
// Delete product 
router.delete("/:productId", jwtVerify_1.verifyJWT, (0, validation_1.validateParams)(product_validation_1.productIdParamValidation), product_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.route.js.map