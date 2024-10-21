import joi from "joi";

export const categoryValidator = joi.object({
  name: joi.string().required(),
});
