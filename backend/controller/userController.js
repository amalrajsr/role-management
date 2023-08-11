import asyncHandler from "express-async-handler";
import AppError from "../utils/error.js";
import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";
import roleModel from "../model/role.model.js";
import { createToken } from "../utils/jwt.js";

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError(400, "Invalid request");
  const userExists = await userModel.findOne({ email });
  if (!userExists) throw new AppError(400, "Invalid credentials");
  const match = await bcrypt.compare(password, userExists.password);
  if (!match) throw new AppError(400, "Invalid credentials");
  const token = createToken(userExists._id);
  res.json({
    success: true,
    token,
  });
});

export const fetchUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find({_id:{$ne:req.id}}).populate("role");
  res.json({
    success: true,
    result: users,
  });
});

// fetching current user details
export const fetchUser = asyncHandler(async (req, res) => {
  const user = await userModel.findOne({_id:req.id}).populate("role");
  res.json({
    success: true,
    result: user,
  });
});

// adding new User
export const addUser = asyncHandler(async (req, res) => {
  const { name, email, password,role } = req.body;
  if (!name || !email || !password || !role) throw new AppError(400, "invalid request");

  // checking whether the user is authorized to add new user or not
 const currenUser= await userModel.findOne({_id:req.id}).populate("role")
if(! currenUser.role.permission.add) throw new AppError(401,'user not authorized')

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

export const editUser= asyncHandler(async (req, res) => {
  const {name, email, password,role } = req.body;
  const {id}= req.params
  if (!id || (!name && !email && !password && !role)) throw new AppError(400, "invalid request");

  // checking whether the user is authorized to add new user or not
 const currenUser= await userModel.findOne({_id:req.id}).populate("role")
if(! currenUser.role.permission.edit) throw new AppError(401,'user not authorized')
  // updating the user
  const updateResult= await userModel.updateOne({_id:id},{$set:{name,email,role}})
  if(!updateResult.modifiedCount ) throw new Error('user updation failed')

  res.json({ success: true });
});

export const deleteUser= asyncHandler(async (req, res) => {
  const {id}= req.params
  if (!id ) throw new AppError(400, "invalid request");

  // checking whether the user is authorized to add new user or not
 const currenUser= await userModel.findOne({_id:req.id}).populate("role")
if(! currenUser.role.permission.delete) throw new AppError(401,'user not authorized')
  // deleting the user
  const deleteResult= await userModel.deleteOne({_id:id})
   if(!deleteResult.deletedCount ) throw new Error('user updation failed')

  res.json({ success: true });
});

