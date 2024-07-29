import Joi from "joi";

const createRegisterUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().email().max(250).required(),
  password: Joi.string().max(100).required(),
  createdAt: Joi.date().default(() => new Date()),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(100).optional(),
  email: Joi.string().email().max(250).optional(),
  password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
  username: Joi.string().max(100).optional(),
  password: Joi.string().max(100).optional(),
});

export default {
  createRegisterUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
};
