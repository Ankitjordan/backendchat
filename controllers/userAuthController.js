import generateOTP from "../utils/generateOTP.js";
import sendMail from "../utils/sendMail.js";
import {
  temp_registeredUsers,
  perm_registeredUsers,
} from "../models/authSaveModel.js";

const registerReqHandler = async (req, res) => {
  const isFirstTime = req.body.username && req.body.password;
  if ((!req.body.password || !req.body.username) && isFirstTime) {
    return res.status(400).json({ msg: "all fields are required" });
  }

  if (await perm_registeredUsers.findOne({ email: req.body.email }))
    return res.status(400).json({ msg: "email already exists" });
  try {
    const otp = generateOTP();
    await temp_registeredUsers.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        $set: { otp },
        $setOnInsert: {
          username: req.body.username,
          password: req.body.password,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );
    sendMail(req.body.email, otp);
    res
      .status(200)
      .json({ email: req.body.email, msg: "OTP send Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

const verifyOTPHandler = async (req, res) => {
  try {
    const data = await temp_registeredUsers.findOne(
      { email: req.body.email, otp: req.body.otp },
      { otp: 0 } // ✅ Don't hide _id
    );
    if (data) {
      const userData = data.toObject();
      delete userData._id;
      const newUser = await perm_registeredUsers.create(userData); // ✅ Validates
      await temp_registeredUsers.deleteOne({ email: req.body.email }); // ✅ Clean up
      return res.status(200).json({ isVerified: true });
    } else {
      return res.status(400).json({ isVerified: false, msg: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ isVerified: false, msg: "Server Error" });
  }
};

export { registerReqHandler, verifyOTPHandler };
