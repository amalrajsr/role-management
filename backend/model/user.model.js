import { Schema, model,Types } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  isAdmin:{
  type:Boolean,
  default:false
  },
  role:{
    type:Types.ObjectId,
    ref:"role"
  }
});

export default model("user",userSchema)