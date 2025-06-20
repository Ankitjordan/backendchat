/* eslint-disable no-empty */

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const authDB = mongoose.createConnection(process.env.AUTH_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const msgDB = mongoose.createConnection(process.env.MSG_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
authDB.on("connected", () => {
  console.log("✅ AuthDB connected to MongoDB");
});

authDB.on("error", (err) => {
  console.log("❌ AuthDB connection error:", err.message);
});
msgDB.on("connected", () => {
  console.log("✅ MsgDB connected to MongoDB");
});
msgDB.on("error", (err) => {
  console.log("❌ MsgDB connection error:", err.message);
});
export { authDB, msgDB };
