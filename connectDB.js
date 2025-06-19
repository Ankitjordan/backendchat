/* eslint-disable no-empty */

import mongoose from "mongoose";

const authDB = mongoose.createConnection("mongodb://localhost:27017/auth_db");
const msgDB = mongoose.createConnection(
  "mongodb://localhost:27017/messages_db"
);

export { authDB, msgDB };
