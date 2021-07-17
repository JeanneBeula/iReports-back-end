const Joi = require('joi');
const signupValidation = function signupValidator(user) {
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
    return schema.validate(user);
  }
  module.exports = signupValidation;