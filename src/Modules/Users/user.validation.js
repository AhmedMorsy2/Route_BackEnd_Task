import Joi from "joi";

const signupVal = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9A-Z]{8,12}$/),
});
const signinVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(/^[A-Z][a-z0-9A-Z]{8,12}$/),
});

export { signupVal, signinVal };
