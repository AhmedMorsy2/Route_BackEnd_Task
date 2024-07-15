import { User } from "../../Database/Models/user.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";
import bcrypt from "bcrypt";

const emailExist = catchError(async (req, res, next) => {
  let emailFound = await User.findOne({ email: req.body.email });
  emailFound ? next(new AppError("Email already exist", 400)) : next();
});

const checkLogin = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("Incorrect Email or Password", 401));
  else if (
    (user || bcrypt.compareSync(req.body.password, user.password)) &&
    user.isConfirm == false
  )
    return next(new AppError("You must confirm your email First"));
  next();
});

const checkConfirmEmail = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || user.otp !== req.body.otp || user.otpExpires < Date.now()) {
    return next(new AppError("Invalid or expired OTP"));
  }
  next();
});

const checkUpdates = catchError(async (req, res, next) => {
  const { email } = req.body;
  let user = await User.find({ email });
  if (user._id == req.user.id)
    return next(new AppError("You are not authorized"));
  if (user.length > 0) return next(new AppError("Email is Already exist", 404));
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
});

export { emailExist, checkLogin, checkConfirmEmail, checkUpdates };
