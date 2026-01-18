"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = require("../../controllers/address.controller");
const jwtVerify_1 = require("../../middlewares/jwtVerify");
const validation_1 = require("../../validations/validation");
const address_validation_1 = require("../../validations/address.validation");
const router = (0, express_1.Router)();
router.post("/initial-location", jwtVerify_1.verifyJWT, (0, validation_1.validateRequest)(address_validation_1.initialLocationValidation), address_controller_1.setInitialLocation);
router.get("/", jwtVerify_1.verifyJWT, address_controller_1.getAddresses);
router.post("/add-address", jwtVerify_1.verifyJWT, (0, validation_1.validateRequest)(address_validation_1.addAddressValidation), address_controller_1.addAddress);
router.patch("/:addressId/default", jwtVerify_1.verifyJWT, (0, validation_1.validateParams)(address_validation_1.addressIdParamValidation), address_controller_1.setDefaultAddress);
router.delete("/:addressId", jwtVerify_1.verifyJWT, (0, validation_1.validateParams)(address_validation_1.addressIdParamValidation), address_controller_1.deleteAddress);
exports.default = router;
//# sourceMappingURL=address.route.js.map