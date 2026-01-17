import { Router } from "express";
import { getMe, listUsers, deleteMe } from "../../controllers/user.controller";
import { verifyJWT } from "../../middlewares/jwtVerify";
//import { isAdmin } from "../../middlewares/isAdmin";
import { validateQuery } from "../../validations/validation";
import { listUsersValidation } from "../../validations/user.validation";

const router = Router();

router.get("/me", verifyJWT, getMe);

router.delete("/delete-me", verifyJWT, deleteMe);

router.get(
  "/",
//  verifyJWT,
 // isAdmin,
  validateQuery(listUsersValidation),
  listUsers
);

export default router;
