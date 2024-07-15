import { catchError } from "../../utils/catchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../Database/Models/user.model.js";
import { sendEmail } from "../../utils/sendEmail.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const signUp = catchError(async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  let user = new User(req.body);
  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();
  user.password = undefined;
  user.otp = undefined;
  user.otpExpires = undefined;
  sendEmail(user.email, otp);

  res.status(201).json({ message: "success", user });
});

const signin = catchError(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  jwt.sign(
    { email: user.email, id: user._id },
    "MorsyAboelgoud",
    (err, token) => {
      res.status(200).json({ message: "Success", token });
    }
  );
});

const verifyOTP = catchError(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  user.isConfirm = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  res.status(200).json({ message: "success", data: "Email confirmed" });
});

const updateProfile = catchError(async (req, res) => {
  const user = await User.findByIdAndUpdate({ _id: req.user.id }, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Success", user });
});
const deleteProfile = catchError(async (req, res) => {
  const user = await User.findByIdAndDelete({ _id: req.user.id });
  res.status(200).json({ message: "Success", user });
});

export { signUp, signin, verifyOTP, updateProfile , deleteProfile };
