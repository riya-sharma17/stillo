import { Router } from "express";
import authRoute from "./auth/auth.route";
import userRoute from "./users/user.route";
import addressRoute from "./addresses/address.route";
import productRoute from "./products/product.route";

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/addresses', addressRoute);
router.use('/products', productRoute);

export default router;
