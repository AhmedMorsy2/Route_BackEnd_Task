import { Category } from "../../Database/Models/category.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";

const checkCategoryExist = catchError(async (req, res, next) => {
  let category = await Category.findOne({ name: req.body.name });
  !category || next(new AppError("Category name is already exist", 404));
  category || next();
});

const checkCategories = catchError(async (req, res, next) => {
  let categories = await Category.find();
  if (categories.length === 0)
    return next(new AppError("There is no categories", 404));

  const userAuthorized = categories.some(
    (category) => category.createdBy.toString() === req.user.id
  );

  if (!userAuthorized) {
    return next(
      new AppError("You are not authorized to perform this action", 403)
    );
  }

  next();
});
const checkIdExist = catchError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Category ID is required", 400));
  }
  let category = await Category.findById(req.params.id);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  if (category.createdBy.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to perform this action", 403)
    );
  }
  next();
});

export { checkIdExist, checkCategoryExist, checkCategories };
