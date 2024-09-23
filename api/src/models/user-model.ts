import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export type CreateUserData = {
  email: string;
  password: string;
};

export type ResultCreateUser = Pick<IUser, "_id">;

export default mongoose.model<IUser>("User", UserSchema);
