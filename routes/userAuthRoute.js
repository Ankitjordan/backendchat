import express from "express";
import {
  verifyOTPHandler,
  registerReqHandler,
} from "../controllers/userAuthController.js";
const RegisterRouter = express.Router();
RegisterRouter.post("/Register", registerReqHandler);
RegisterRouter.post("/Register/verify", verifyOTPHandler);

export default RegisterRouter;
