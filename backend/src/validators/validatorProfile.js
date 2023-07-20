const Joi = require("joi");

const profileSchema = Joi.object({
  firstname: Joi.string().min(2).max(100).required(),
  lastname: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().max(200).required(),
});

const validatorProfile = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = profileSchema.validate(
    {
      firstname,
      lastname,
      email,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
    console.warn(error.details);
  } else {
    next();
  }
};

module.exports = {
  validatorProfile,
};
