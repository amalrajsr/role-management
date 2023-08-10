import asyncHandler from "express-async-handler";
import AppError from "../utils/error.js";
import bcrypt from "bcrypt";
import adminModel from "../model/admin.model.js";
import { createToken } from "../utils/jwt.js";
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) throw new AppError(400, "invalid request");
  const adminExist = await adminModel.findOne();
  if (adminExist) throw new AppError(409, "admin account exists");
  const newPass = await bcrypt.hash(password, 10);
  if (!newPass) throw new Error("password hashing failed");
  const admin = new adminModel({
    name,
    email,
    password: newPass,
  });
  await admin.save();
  res.json({ success: true });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError(400, "invalid request");
  const admin = await adminModel.findOne({ email });
  if (!admin) throw new AppError(400, "invalid credentials");
  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new AppError(400, "invalid credentials");
  const token = createToken(admin._id);
  res.json({
    success: true,
    token,
  });
});
