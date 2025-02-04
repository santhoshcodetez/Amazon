const Joi = require("joi");

const registerSchema = Joi.object({
    Username: Joi.string().min(3).max(30).required(),
    Password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    contact: Joi.number().min(10).required()
});

module.exports = { registerSchema };
