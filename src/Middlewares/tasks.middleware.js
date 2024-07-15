import { Category } from "../../Database/Models/category.model.js";
import { Tasks } from "../../Database/Models/tasks.model.js";
import { AppError } from "../utils/appError.js";
import { catchError } from "../utils/catchError.js";

const checkTaskOwner = catchError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Task ID is required", 400));
  }

  let task = await Tasks.findById(req.params.id);
  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  if (task.createdBy.toString() !== req.user.id) {
    return next(
      new AppError("You are not authorized to perform this action", 403)
    );
  }

  next();
});

const checkPublicTasks = catchError(async (req, res, next) => {
  let tasks = await Tasks.find({ status: "public" });
  if (tasks.length === 0)
    return next(new AppError("There no public tasks", 404));

  next();
});

const checkCategoryOwnerBeforeAddedToTask = catchError(
  async (req, res, next) => {
    let category = await Category.findById(req.body.category);
    if (category.createdBy.toString() !== req.user.id)
      return next(new AppError("Unauthorized to add this category id", 403));
    next();
  }
);
export {
  checkTaskOwner,
  checkPublicTasks,
  checkCategoryOwnerBeforeAddedToTask,
};
