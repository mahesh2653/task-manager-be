import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.boolean().optional(),
  userId: Joi.number().required(),
});

export default taskSchema;
