import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

export const User = mongoose.model<IUser>('User', userSchema);
