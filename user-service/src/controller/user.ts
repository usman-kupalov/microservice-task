import { catchAsync } from "@middleware/errorHandler";
import { Request, Response } from "express";
import UserService from "@services/userService";
import { NotFoundError, ResourceExistError } from "@middleware/error";
import {
  createUserSchema,
  paginationSchema,
  updateUserSchema,
  userIdSchema,
  validateSchema,
} from "@controller/validation/schema";
import { publishEvent } from "@services/publisher";
import { EVENT_TYPES } from "@src/constants";

const userService = new UserService();

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email } = validateSchema(req.body, createUserSchema());

  const user = await userService.findUserByEmail(email);
  if (user) throw new ResourceExistError();

  await userService.createUser({ name: name, email: email });

  await publishEvent({
    type: EVENT_TYPES.USER_CREATED,
    data: name,
  });
  res.status(201).json({ status: "ok" });
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { limit, skip } = validateSchema(req.query, paginationSchema());
  const users = await userService.getAllUsers(limit, skip);

  res.status(200).json({ data: users });
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = validateSchema(req.params, userIdSchema());
  const user = await userService.findUserById(id);
  if (!user) throw new NotFoundError();

  res.status(200).json(user);
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const body = {
    email: req.body.email,
    name: req.body.name,
    id: req.params.id,
  };
  const { email, name, id } = validateSchema(body, updateUserSchema());

  const user = await userService.findUserById(id);
  if (!user) throw new NotFoundError();

  await userService.updateUser(id, {
    email,
    name,
  });

  res.status(204).end();
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = validateSchema(req.params, userIdSchema());

  const user = await userService.findUserById(id);
  if (!user) throw new NotFoundError();
  await userService.deleteUser(id);

  await publishEvent({
    type: EVENT_TYPES.USER_DELETED,
    data: id,
  });

  res.status(204).end();
});
