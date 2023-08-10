import { Schema, model } from "mongoose";

const roleModel = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  permission: {
    add: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
});

export default model("role", roleModel);
