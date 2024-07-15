import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isConfirm: {
      type: Boolean,
      default: false,
    },
    otp: String,
    otpExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const User = model("User", schema);
