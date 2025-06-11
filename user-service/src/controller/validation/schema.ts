import Joi, { ObjectSchema } from "joi";
import { BadRequestError } from "@middleware/error";
import {
  emailField,
  nameField,
  paginationField,
  userIdField,
} from "@controller/validation/field";

export const validateSchema = <T>(body: T, schema: ObjectSchema<T>): T => {
  const { error, value } = schema.validate(body);
  if (error) {
    const [path] = error.details;
    const { path: errorField, message } = path;
    throw new BadRequestError(
      message,
      `Validation error on field ${errorField[0]}`,
    );
  }

  return value;
};

export const createUserSchema = () => {
  return Joi.object({
    email: emailField(),
    name: nameField(),
  });
};

export const updateUserSchema = () => {
  return Joi.object({
    id: userIdField(),
    email: emailField(),
    name: nameField(),
  });
};

export const paginationSchema = () => {
  return Joi.object({
    limit: paginationField(),
    skip: paginationField(),
  });
};

export const userIdSchema = () => {
  return Joi.object({
    id: userIdField(),
  });
};
