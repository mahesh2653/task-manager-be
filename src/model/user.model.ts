import mongoose from "mongoose";

interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("user", userSchema);

export default UserModel;
