"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../controllers/user.controller");
const jwtVerify_1 = require("../../middlewares/jwtVerify");
//import { isAdmin } from "../../middlewares/isAdmin";
const validation_1 = require("../../validations/validation");
const user_validation_1 = require("../../validations/user.validation");
const router = (0, express_1.Router)();
router.get("/me", jwtVerify_1.verifyJWT, user_controller_1.getMe);
router.delete("/delete-me", jwtVerify_1.verifyJWT, user_controller_1.deleteMe);
router.get("/", 
//  verifyJWT,
// isAdmin,
(0, validation_1.validateQuery)(user_validation_1.listUsersValidation), user_controller_1.listUsers);
exports.default = router;
//# sourceMappingURL=user.route.js.map