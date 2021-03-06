const Joi = require("joi");
class User {
  static async signUpValidation(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().max(50).trim().required(),
      lastName: Joi.string().max(50).required(),
      email: Joi.string().required().email(),
      password: Joi.string()
        .min(5)
        .required()
        .regex(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/
        ),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).json(error.message);
    }
    next();
  }
  static async loginValidator(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string()
        .min(5)
        .required()
        .regex(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/
        ),
    });
    const { error } = schema.validate(req.body);
    if (error){
      return res.status(422).json(error.message);
    }
    next();
  }
}
module.exports = User;
