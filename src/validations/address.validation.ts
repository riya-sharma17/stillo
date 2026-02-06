import Joi from "joi";

export const addAddressValidation = Joi.object({
  label: Joi.string()
    .optional()
    .allow("")
    .messages({
      "string.base": "Label must be a string",
    }),

  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),

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