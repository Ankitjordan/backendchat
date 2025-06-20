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

export { authDB, msgDB };
