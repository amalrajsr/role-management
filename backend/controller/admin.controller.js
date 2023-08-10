import asyncHandler from "express-async-handler";
import AppError from "../utils/error.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) throw new AppError(400, "invalid request");
  const adminExist = await userModel.findOne();
  if (adminExist) throw new AppError(409, "account exists");
  const newPass = await bcrypt.hash(password, 10);
  if (!newPass) throw new Error("password hashing failed");
  const user = new userModel({
    name,
    email,
    password: newPass,
    isAdmin:true
  });
  await user.save();
  res.json({ success: true });
});
