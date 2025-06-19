import express from "express";
import {
  newRoom,
  existingRoom,
  msgRoom,
  msgdata,
} from "../controllers/homeControl.js";
const router = express.Router();

router.post("/newroom", newRoom);
router.post("/existingroom", existingRoom);
router.post("/messageroom", msgRoom);
router.post("/messagedata", msgdata);

export default router;
