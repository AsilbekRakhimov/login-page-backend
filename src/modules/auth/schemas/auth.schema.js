import { required } from "joi";
import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      minLength: [2, "Full name uzunligi kamida 2 bo'lishi kerak"],
      required: false,
      default: "Common user",
      unique: false,
    },
    email: {
      type: String,
      minLength: [10, "Email uzunligi kamida 10 bolishi kerak!"],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: [4, "Password uzunligi kamida 10 bolishi kerak!"],
      required: true,
      unique: false,
    },
  },
  {
    _id: true,
    timestamps: true,
    collection: "users",
  }
);

export const Users = mongoose.model("users", usersSchema);
