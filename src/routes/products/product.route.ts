import { Router } from "express";
import { verifyJWT } from "../../middlewares/jwtVerify";
import { validateRequest, validateParams } from "../../validations/validation";
import {
  createProductValidation,
  editProductValidation,
  productIdParamValidation,
} from "../../validations/product.validation";
import {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
} from "../../controllers/product.controller";
import upload from "../../middlewares/multer";

const router = Router();

// Get all active products
router.get("/", getAllProducts);

// Get product by ID
router.get(
  "/:productId",
  validateParams(productIdParamValidation),
  getProductById
);

// Create product
router.post(
  "/create-product",
  verifyJWT,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 2 }
  ]),
  validateRequest(createProductValidation),
  createProduct
);

// Edit product 
router.put(
  "/:productId",
  verifyJWT,
  validateParams(productIdParamValidation),
  validateRequest(editProductValidation),
  editProduct
);

// Delete product 
router.delete(
  "/:productId",
  verifyJWT,
  validateParams(productIdParamValidation),
  deleteProduct
);

export default router;
