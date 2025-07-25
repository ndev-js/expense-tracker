import Joi from "joi";
export const objectId = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": `"userId" must be a valid ObjectId`,
  });
export const validteParamsObjectId = Joi.object({
  userId: objectId.required(),
});

export const validteQueryObjectId = Joi.object({
  validteQueryObjectId: objectId.required(),
});
