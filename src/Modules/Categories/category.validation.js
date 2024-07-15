import Joi from "joi";

const addCategoryVal = Joi.object({
  name: Joi.string().required(),
  createdBy: Joi.number(),
});


export { addCategoryVal };
