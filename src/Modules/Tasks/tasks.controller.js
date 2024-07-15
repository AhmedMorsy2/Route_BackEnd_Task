import { Tasks } from "../../../Database/Models/tasks.model.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";

const addTask = catchError(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  let task = new Tasks(req.body);
  await task.save();
  res.status(201).json({ message: "success", task });
});

const getTasks = catchError(async (req, res) => {
  let apiFeatures = new ApiFeature(Tasks.find(), req.query)
    .pagination()
    .sort()
    .filter();
  let tasks = await apiFeatures.mongooseQuery.populate("category", "name");

  res
    .status(200)
    .json({ message: "success", page: apiFeatures.pageNumber, tasks });
});

const getSpecificTask = catchError(async (req, res, next) => {
  let task = await Tasks.findById(req.params.id)
    .populate("category", "name")
    .populate("createdBy", "name");
  task || next(new AppError("Task Not Found", 404));
  !task || res.status(200).json({ message: "Success", task });
});

const updateTask = catchError(async (req, res) => {
  let task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "success", task });
});

const deleteTask = catchError(async (req, res) => {
  let task = await Tasks.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "success", task });
});

const getPuplicTasks = catchError(async (req, res) => {
  let apiFeatures = new ApiFeature(Tasks.find({ status: "public" }), req.query)
    .pagination()
    .sort()
    .filter();
  let tasks = await apiFeatures.mongooseQuery.populate("category", "name");
  res.status(200).json({
    message: "success",
    page: apiFeatures.pageNumber,
    tasks,
  });
});

export {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  getPuplicTasks,
  getSpecificTask,
};
