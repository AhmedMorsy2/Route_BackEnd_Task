import Joi from "joi";

const addTaskVal = Joi.object({
  category: Joi.string().required(),
  createdBy: Joi.string(),
  TextTask: Joi.string(),
  status: Joi.string(),
  ListOfTasks: Joi.array(),
});

const updateTaskVal = Joi.object({
  ListOfTasks: Joi.array(),
  TextTask: Joi.string(),
});

export { addTaskVal, updateTaskVal };
