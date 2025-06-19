import mongoose from "mongoose";
import { authDB } from "../connectDB.js";
import { msgDB } from "../connectDB.js";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    maxlength: 10,
    unique: true,
  },

  pass: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const msgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  msg: {
    type: String,
    required: true,
  },
});

const msgModel = msgDB.model("message", msgSchema);
const authModel = authDB.model("authorize", authSchema);

export { authModel, msgModel };
