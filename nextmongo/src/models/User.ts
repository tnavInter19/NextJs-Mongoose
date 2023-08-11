import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "superadmin";
  otp: string;
  otpExpiration: Date;
  isOTPVerified: boolean;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user", "superadmin"],
    default: "user",
  },
  otp: {
    type: String,
    required: [true, 'Please provide OTP'],
  },
  otpExpiration: {
    type: Date,
    required: [true, 'Please provide OTP expiration'],
  },
  isOTPVerified: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default UserModel;
