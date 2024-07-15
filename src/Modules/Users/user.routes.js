import { Router } from "express";
import {
  deleteProfile,
  signin,
  signUp,
  updateProfile,
  verifyOTP,
} from "./user.controller.js";
import {
  checkConfirmEmail,
  checkLogin,
  checkUpdates,
  emailExist,
} from "../../Middlewares/user.middleware.js";
import { checkToken } from "../../utils/tokenCheck.js";
import { validations } from "../../utils/validation.js";
import { signinVal, signupVal } from "./user.validation.js";

const userRouter = Router();

userRouter.post("/signup", emailExist, validations(signupVal), signUp);
userRouter.post("/signin", checkLogin, validations(signinVal), signin);
userRouter.post("/verifyemail", checkConfirmEmail, verifyOTP);

userRouter.use(checkToken);
userRouter.route("/").put(checkUpdates, updateProfile).delete(deleteProfile);
export default userRouter;
