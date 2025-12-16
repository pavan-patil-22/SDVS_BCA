import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Principal from "../models/Principal.js";
import nodemailer from "nodemailer";

// ************************REGISTER**************************
export const register = async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    const existing = await Principal.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const principal = new Principal({
      email,
      password: hashedPassword,
      name,
      phone,
      profilePic: req.file ? req.file.path : null,
    });

    await principal.save();
    res.status(201).json({ message: "Principal registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ************************LOGIN**************************
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const principal = await Principal.findOne({ email });
    if (!principal) return res.status(404).json({ message: "Principal not found" });

    const isMatch = await bcrypt.compare(password, principal.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: principal._id, role: principal.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, principal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ************************CHANGE PASSWORD**************************
export const changePassword = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const { oldPassword, newPassword } = req.body;
    const principal = req.user;

    const isMatch = await bcrypt.compare(oldPassword, principal.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    principal.password = await bcrypt.hash(newPassword, 10);
    await principal.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ************************FORGOT PASSWORD**************************
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const principal = await Principal.findOne({ email });
    if (!principal) return res.status(404).json({ message: "Email not found" });

    // GENERATE RANDOM NEW PASSWORD
    const newPass = Math.random().toString(36).slice(-8);
    principal.password = await bcrypt.hash(newPass, 10);
    await principal.save();

    // SEND EMAIL WITH NODEMAILER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset - College Portal",
      text: `Your new temporary password is: ${newPass}`,
    });
    console.log(newPass);  
    res.json({ message: "New password sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
