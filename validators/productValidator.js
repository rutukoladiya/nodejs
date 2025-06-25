import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().required(),
  category: Joi.string().min(2).max(20).required(),
  inStock: Joi.boolean().optional(),
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  price: Joi.number(),
  catrgory: Joi.string().min(2).max(20),
  inStock: Joi.boolean().optional(),
});
