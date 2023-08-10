import asyncHandler from "express-async-handler";
import AppError from "../utils/error.js";
import bcrypt from "bcrypt";
import adminModel from "../model/admin.model.js";
import userModel from "../model/user.model.js";
import roleModel from "../model/role.model.js";
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

export const addUser = asyncHandler(async (req, res) => {
  const { name, email, password,role } = req.body;
  console.log(role)
  if (!name || !email || !password || !role) throw new AppError(400, "invalid request");
  const userExists = await userModel.findOne({ email });
  if (userExists) throw new AppError(409, "email exists");
  const newPass = await bcrypt.hash(password, 10);
  if (!newPass) throw new Error("password hashing failed");
  const user = new userModel({
    name,
    email,
    role,
    password: newPass,
  });
  await user.save();
  res.json({ success: true });
});

export const fetchUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find().populate("role");
  res.json({
    success: true,
    result: users,
  });
});

export const addRole = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const permission = req.body.permission;
  const roleExists = await roleModel.findOne({ name });
  // checking role already exists or not
  if (roleExists) throw new AppError(409, "role already exists");
  // validating the request body
  if ((name && permission.add) || permission.edit || permission.delete) {
    const role = new roleModel(req.body);
    await role.save();
    res.json({ success: true });
  } else throw new AppError(400, "Invalid request");
});

export const fetchRole = asyncHandler(async (req, res) => {
  const roles = await roleModel.find();
  res.json({ success: true, result: roles });
});
