const Joi = require("joi");

const userConnexionSchema = Joi.object({
  email: Joi.string().email().min(6).max(200).required(),
  password: Joi.string()
    .min(8)
    .max(100)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

const validateUserConnexion = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = userConnexionSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUserConnexion,
};
