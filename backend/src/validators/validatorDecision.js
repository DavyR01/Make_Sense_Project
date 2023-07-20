const Joi = require("joi");

const decisionSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().required(),
  date_decision_conflict: Joi.date(),
  date_decision_close: Joi.date(),
  status_decision: Joi.string().min(3).max(45).required(),
  user_id: Joi.number().integer().required(),
  person_expert: Joi.array().required(),
  person_concern: Joi.array().required(),
});

const validatorDecision = (req, res, next) => {
  // validate req.body then call next() if everything is ok
  const {
    title,
    content,
    date_decision_conflict,
    date_decision_close,
    status_decision,
    user_id,
    person_expert,
    person_concern,
  } = req.body;

  const { error } = decisionSchema.validate(
    {
      title,
      content,
      date_decision_conflict,
      date_decision_close,
      status_decision,
      user_id,
      person_expert,
      person_concern,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validatorDecision,
};
