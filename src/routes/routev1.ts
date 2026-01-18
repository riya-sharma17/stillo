import { Router } from "express";
import authRoute from "./auth/auth.route";
import userRoute from "./users/user.route";
import addressRoute from "./addresses/address.route";

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/addresses', addressRoute);

export default router;
