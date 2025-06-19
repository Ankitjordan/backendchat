/* eslint-disable no-empty */
import { authModel, msgModel } from "../models/authModel.js";

// TODO: Use bcrypt to hash password before saving (for future security)

const newRoom = async (req, res) => {
  if (await authModel.exists({ roomId: req.body.roomId }))
    return res.status(400).json({
      message: "Room already exists try entering a different id ",
      redirect: "/existingroom",
    });
  const user = new authModel({
    name: req.body.name,
    roomId: req.body.roomId,
    pass: req.body.password,
  });

  try {
    const rep = await user.save();
    if (rep) res.status(200).json({ msg: "Successfully Created Room" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Can't create room now Try later" });
  }
};

const existingRoom = async (req, res) => {
  console.log(req.body);
  try {
    const user = await authModel.findOne({
      roomId: req.body.roomId,
      pass: req.body.password,
    });
    if (user)
      return res
        .status(200)
        .json({ roomKey: req.body.password, userName: user.name });
    else {
      return res.status(400).json({ msg: "invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//logic for authDB
const msgRoom = async (req, res) => {
  console.log(req.body);
  const Message = new msgModel({
    name: req.body.name,
    msg: req.body.message,
  });

  try {
    await Message.save();
    res.status(200).json({ feedback: "Msg saved Successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ feedback: "error while connecting server try later " });
  }
};

const msgdata = async (req, res) => {
  try {
    const response = await msgModel.find({ name: req.body.name });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export { newRoom, existingRoom, msgRoom, msgdata };
