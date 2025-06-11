import Joi from "joi";

const errorMessages = () => {
  return {
    "any.required": "Field is required",
    "string.base": "Field must be a string",
    "string.empty": "Field must be not empty",
    "string.guid": "Field must be type of uuid",
    "number.min": "Field must be not less than 1",
    "string.length": "Field must be 8 characters",
    "string.email": "Field must be a valid email",
    "string.min": "Field must be at least 8 characters",
  };
};

export const emailField = () => {
  return Joi.string().email().messages(errorMessages()).required();
};

export const nameField = () => {
  return Joi.string().messages(errorMessages()).required();
};

export const userIdField = () => {
  return Joi.string().uuid().messages(errorMessages()).required();
};

export const paginationField = () => {
  return Joi.number().messages(errorMessages()).min(1);
};
