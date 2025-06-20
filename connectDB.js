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
authDB.on("error", (err) => {
  console.error("Error connecting to authDB:", err);
});
msgDB.on("error", (err) => {
  console.error("Error connecting to msgDB:", err);
});

export { authDB, msgDB };
