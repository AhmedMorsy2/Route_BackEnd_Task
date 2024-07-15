import { AppError } from "./appError.js";
import jwt from "jsonwebtoken";
import { catchError } from "./catchError.js";

export const checkToken = catchError(async (req, res, next) => {
  if (!req.headers.token) return next(new AppError("Token Required", 404));
  let [key, token] = req.headers.token.split(" ");
  if (!key || !token) {
    next(new AppError("No token provided", 401));
  }
  jwt.verify(token, "MorsyAboelgoud", async (err, decode) => {
    if (err) return next(new AppError("Unauthorized ", 401));
    else {
      req.user = decode;
      next();
    }
  });
});
