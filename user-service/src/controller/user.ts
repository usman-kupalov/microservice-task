import { catchAsync } from "@middleware/errorHandler";
import { Request, Response } from "express";
import UserService from "@services/userService";
import { NotFoundError, ResourceExistError } from "@middleware/error";

const userService = new UserService();

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email } = req.body as {
    name: string;
    email: string;
  };

  const user = await userService.findUserByEmail(email);
  if (user) throw new ResourceExistError();

  await userService.createUser({ name: name, email: email });
  res.status(201).json({ status: "ok" });
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { limit } = req.query as unknown as { limit: number };
  const users = await userService.getAllUsers(limit);

  res.status(200).json({ data: users });
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as unknown as { id: string };
  const user = await userService.findUserById(id);
  if (!user) throw new NotFoundError();

  res.status(200).json(user);
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { email, name } = req.body as {
    email: string;
    name: string;
  };

  const user = await userService.findUserById(id);
  if (!user) throw new NotFoundError();

  const updatedUser = await userService.updateUser(id, {
    email,
    name,
  });

  res.status(200).json({ data: updatedUser });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as unknown as { id: string };

  const user = await userService.findUserById(id.toString());
  if (!user) throw new NotFoundError();
  await userService.deleteUser(id);

  res.status(204).end();
});
