import { text } from "express";
import nodemailer from "nodemailer";

const sendMail = (userMail, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ankityar13@gmail.com",
      pass: "pkdedqgeyzigetxb",
    },
  });
  const mailOptions = {
    from: "ankityar13@gmail.com",
    to: userMail,
    subject: "Use this OTP to verify your ChatJod account",
    text: `Your OTP for ChatJOD is ${otp}`,
    html: `<div style="max-width: 500px; margin: auto; padding: 20px; background: linear-gradient(135deg, #ff9a9e, #fad0c4); border-radius: 15px; font-family: 'Segoe UI', sans-serif; color: #333; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
  <h2 style="text-align: center; color: #fff;">💌 Your OTP from <strong>CHATJOD</strong></h2>
  <p style="text-align: center; font-size: 16px;">Use the OTP below to verify your account:</p>
  
  <div style="margin: 20px auto; width: fit-content; background: white; padding: 15px 25px; font-size: 28px; font-weight: bold; color: #ff4da6; border-radius: 10px; border: 2px solid #fff;">
    ${otp}
  </div>
  
  <p style="font-size: 14px; text-align: center;">If you didn’t request this, ignore it.</p>
  <p style="font-size: 12px; text-align: center; color: #eee;">&copy; 2025 CHATJOD</p>
</div>
`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err);
    console.log(info.response);
  });
};

export default sendMail;
