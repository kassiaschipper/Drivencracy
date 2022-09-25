import joi from "joi";
import JoiDateFactory from "@joi/date";

const joiDate = joi.extend(JoiDateFactory);

const pollSchema = joi.object({
  title: joi.string().required(),
  expireAt: joiDate.date().format("YYYY-MM-DD hh:mm")
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