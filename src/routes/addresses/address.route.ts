import { Router } from "express";
import {
    getAddresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    setInitialLocation,
} from "../../controllers/address.controller";
import { verifyJWT } from "../../middlewares/jwtVerify";
import { validateRequest, validateParams } from "../../validations/validation";
import {
    addAddressValidation,
    addressIdParamValidation,
    initialLocationValidation,
} from "../../validations/address.validation";

const router = Router();

router.post(
  "/initial-location",
  verifyJWT,
  validateRequest(initialLocationValidation),
  setInitialLocation
);

router.get("/", verifyJWT, getAddresses);

router.post(
    "/add-address",
    verifyJWT,
    validateRequest(addAddressValidation),
    addAddress
);

router.patch(
    "/:addressId/default",
    verifyJWT,
    validateParams(addressIdParamValidation),
    setDefaultAddress
);

router.delete(
    "/:addressId",
    verifyJWT,
    validateParams(addressIdParamValidation),
    deleteAddress
);

export default router;
