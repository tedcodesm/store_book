import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const authtoken = process.env.JWT_SECRET;
const emailpass = process.env.EMAIL_PASSWORD;
const verifyemail = process.env.VERIFY_EMAIL;

const generateToken = (userId) => {
  return jwt.sign({ userId }, authtoken, { expiresIn: "15d" });
};

const sendVerificationEmail = async (otp, email, username) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: verifyemail,
        pass: emailpass,
      },
    });
    await transporter.verify();    
    console.log("Email transporter is ready to send messages");

    const message = `<h1>Thank you for creating account with us  ${username}</h1>
    <p>Your verification code is ${otp} and it expires in 2 minutes</p>`;

    const info = await transporter.sendMail({
      from: verifyemail,
      to: email,
      subject: "Email Verification",
      html: message,
    });
    console.log("Email sent successfully", info.messageId);
  } catch (error) {
    console.log(error);
    throw new Error("Error sending message");
  }
};

router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log("requessted body");

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be atleast 6 characters" });
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username should be atleast 3 characters long" });
    }

const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(401).json({ message: "User already exist" });
    }
    //generate otp
    const userotp = Math.floor(100000 + Math.random() * 900000).toString();
    const profileImage = `https://api.dicebear.com/7.x/avataars/svg?seed=${username}`;

    const user = new User({
      email,
      username,
      password,
      otp: userotp,
      profileImage,
    });

    await user.save();
    await sendVerificationEmail(userotp, user.email, user.username)
    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in register routes", error);
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.Verified = true;
    user.otp = "";
    await user.save();

    res.status(200).json({
      message: "User verified successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log("Error in verify route", error);
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user already exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    //generate token
    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    console.log("Error in Login route",error);
    res.status(500).json({message:"internal server error"})
  }
});

export default router;
