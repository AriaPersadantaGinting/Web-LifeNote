import Joi from "joi";

const createNoteUserValidation = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(2500).optional(),
  notetype: Joi.string()
    .valid("PRIVATE", "IMPORTANT", "GENERAL", "TODO", "ARCHIVED")
    .required(),
  username: Joi.string().max(100).required(),
  createdAt: Joi.date()
    .iso()
    .default(() => new Date()),
});

const getAllNoteUserValidation = Joi.number().positive().required();

const updateNoteUserValidation = Joi.object({
  title: Joi.string().max(100).optional(),
  description: Joi.string().max(2500).optional(),
  notetype: Joi.string()
    .valid("PRIVATE", "IMPORTANT", "GENERAL", "TODO", "ARCHIVED")
    .optional(),
  updatedAt: Joi.date().iso().required().max("now"),
});

export default {
  createNoteUserValidation,
  getAllNoteUserValidation,
  updateNoteUserValidation,
};
