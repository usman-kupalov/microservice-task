import User, { UserPayload } from "@db/schema/user";
import { v4 } from "uuid";

class UserService {
  constructor() {}

  async createUser(payload: UserPayload): Promise<void> {
    await User.create({
      id: v4(),
      name: payload.name,
      email: payload.email,
    });
  }

  async getAllUsers(limit: number = 10, skip = 0): Promise<UserPayload[]> {
    return User.find().limit(limit).skip(skip);
  }

  async findUserById(id: string): Promise<UserPayload | null> {
    return User.findOne({
      id: id,
    });
  }

  async findUserByEmail(email: string): Promise<UserPayload | null> {
    return User.findOne({
      email: email,
    });
  }

  async updateUser(id: string, payload: UserPayload) {
    await User.updateOne(
      {
        email: id,
      },
      {
        email: payload.email,
        name: payload.name,
      },
    );
  }

  async deleteUser(id: string) {
    await User.deleteOne({
      id: id,
    });
  }
}

export default UserService;
