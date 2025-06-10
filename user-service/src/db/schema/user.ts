import { model, Schema } from "mongoose";
import { isEmail } from "validator";

export interface UserPayload {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

const UserSchema = new Schema<UserPayload>({
  id: { required: true, type: String },
  name: { required: true, type: String },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: [isEmail, "Please fill a valid email address"],
  },
  createdAt: { required: true, type: Date, default: Date.now() },
});

const User = model<UserPayload>("user", UserSchema);

export default User;
