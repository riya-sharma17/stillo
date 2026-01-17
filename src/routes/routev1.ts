import { Router } from "express";
import authRoute from "./auth/auth.route";
import userRoute from "./users/user.route";

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);

export default router;
