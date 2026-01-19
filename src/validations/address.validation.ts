import Joi from "joi";

export const addAddressValidation = Joi.object({
  label: Joi.string()
    .required()
    .messages({
      "string.empty": "Label is required",
    }),

  lat: Joi.number().optional(),
  lng: Joi.number().optional(),

  address: Joi.string().allow("").optional(),
  makeDefault: Joi.boolean().optional(),
});


export const addressIdParamValidation = Joi.object({
  addressId: Joi.string()
    .length(24)
    .hex()
    .required(),
});

export const initialLocationValidation = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  address: Joi.string().optional(),
});