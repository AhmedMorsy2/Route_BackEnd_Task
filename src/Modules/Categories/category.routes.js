import { Router } from "express";
import { checkToken } from "../../utils/tokenCheck.js";
import {
  addCategory,
  allCategories,
  deleteCategory,
  specificCategory,
  updateCategory,
} from "./category.controller.js";
import { validations } from "../../utils/validation.js";
import { addCategoryVal } from "./category.validation.js";
import {
  checkCategories,
  checkCategoryExist,
  checkIdExist,
} from "../../Middlewares/category.middleware.js";

const categoryRouter = Router();

categoryRouter.use(checkToken);
categoryRouter
  .route("/")
  .get(checkCategories, allCategories)
  .post(validations(addCategoryVal), checkCategoryExist, addCategory);

categoryRouter
  .route("/:id")
  .put(checkIdExist, updateCategory)
  .delete(checkIdExist, deleteCategory);

categoryRouter.get("/category/:id", checkIdExist, specificCategory);

export default categoryRouter;
