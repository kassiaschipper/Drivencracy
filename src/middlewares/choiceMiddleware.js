import joi from "joi";

const choiceSchema = joi.object({
  title: joi.string().min(1).required(),
  pollId: joi.string().required()
});

export function choiceValidation(req, res, next) {
  const choice = req.body;

  const validation = choiceSchema.validate(choice);

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(422);
  }

  next();
}