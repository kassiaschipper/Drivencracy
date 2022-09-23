import joi from "joi";

const pollSchema = joi.object({
  title: joi.string().required(),
  expireAt: joi.allow("")
});

export function pollValidation(req, res, next) {
  const poll = req.body;

  const validation = pollSchema.validate(poll);

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(422);
  }

  next();
}