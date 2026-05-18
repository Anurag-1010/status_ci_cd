import User from "../models/User.js";
import Otp from "../models/Otp.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// SEND OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  console.log("Emial",email)


  if (!email)
    return res.status(400).json({ message: "Email required" });

  // Create user if not exists
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email });
  }


  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email });

  await Otp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60000)
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`
  });

  console.log(otp)
  res.json({ message: "OTP sent successfully" });
};


// VERIFY OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email,otp)
  const record = await Otp.findOne({ email, otp });
  console.log("record",record)
  if (!record)
    return res.status(400).json({ message: "Invalid OTP" });

  if (record.expiresAt < new Date())
    return res.status(400).json({ message: "OTP expired" });

  const user = await User.findOne({ email });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  await Otp.deleteMany({ email });

  res.json({
    message: "Login successful",
    token,
    user
  });
};