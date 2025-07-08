import mongoose from "mongoose";
import { authDB } from "../connectDB.js";

const temp_userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  country: { type: String, required: true, trim: true },
  otp: {
    type: Number,
    match: [/^\d{6}$/, "OTP must be of 6 digit"],
    required: true,
  },
  createdAt: { default: Date.now, expires: 15 * 60, type: Date },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  country: { type: String, required: true, trim: true },
});

const temp_registeredUsers = authDB.model(
  "temp_registeredUser",
  temp_userSchema
);

const perm_registeredUsers = authDB.model("perm_registeredUser", userSchema);

export { temp_registeredUsers, perm_registeredUsers };
