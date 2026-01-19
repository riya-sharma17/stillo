"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const user_route_1 = __importDefault(require("./users/user.route"));
const address_route_1 = __importDefault(require("./addresses/address.route"));
const product_route_1 = __importDefault(require("./products/product.route"));
const router = (0, express_1.Router)();
router.use('/auth', auth_route_1.default);
router.use('/users', user_route_1.default);
router.use('/addresses', address_route_1.default);
router.use('/products', product_route_1.default);
exports.default = router;
//# sourceMappingURL=routev1.js.map