import { Router } from "express";
import {
  addTask,
  deleteTask,
  getPuplicTasks,
  getSpecificTask,
  getTasks,
  updateTask,
} from "./tasks.controller.js";
import { checkToken } from "../../utils/tokenCheck.js";
import { addTaskVal, updateTaskVal } from "./tasks.validation.js";
import { validations } from "../../utils/validation.js";
import {
  checkCategoryOwnerBeforeAddedToTask,
  checkPublicTasks,
  checkTaskOwner,
} from "../../Middlewares/tasks.middleware.js";

const taskRouter = Router();

taskRouter.get("/public", checkPublicTasks, getPuplicTasks);

taskRouter.use(checkToken);

taskRouter
  .route("/")
  .post(validations(addTaskVal), checkCategoryOwnerBeforeAddedToTask, addTask)
  .get(getTasks);

taskRouter
  .route("/:id")
  .get(checkTaskOwner, getSpecificTask)
  .put(checkTaskOwner, validations(updateTaskVal), updateTask)
  .delete(checkTaskOwner, deleteTask);

export default taskRouter;
