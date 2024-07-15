import { Category } from "../../../Database/Models/category.model.js";
import { ApiFeature } from "../../utils/ApiFeature.js";
import { catchError } from "../../utils/catchError.js";

const addCategory = catchError(async (req, res) => {
  req.body.createdBy = req.user.id;
  let category = new Category(req.body);
  await category.save();
  res.status(201).json({ message: "success", category });
});
const updateCategory = catchError(async (req, res) => {
  let category = await Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "success", category });
});
const deleteCategory = catchError(async (req, res) => {
  let category = await Category.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({ message: "success", category });
});
const allCategories = catchError(async (req, res) => {
  let apiFeatures = new ApiFeature(Category.find(), req.query)
    .pagination()
    .sort()
    .filter();
  let categories = await apiFeatures.mongooseQuery.populate(
    "createdBy",
    "name"
  );
  res
    .status(200)
    .json({ message: "success", Page: apiFeatures.pageNumber, categories });
});
const specificCategory = catchError(async (req, res) => {
  let category = await Category.findOne({ _id: req.params.id }).populate(
    "createdBy",
    "name email"
  );
  res.status(200).json({ message: "success", category });
});

export {
  addCategory,
  updateCategory,
  deleteCategory,
  allCategories,
  specificCategory,
};
