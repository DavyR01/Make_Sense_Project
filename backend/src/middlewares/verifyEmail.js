const models = require("../models");

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  models.user
    .selectEmail(email)
    .then(([result]) => {
      if (email === result[0]?.email) {
        res.sendStatus(401);
      } else {
        next();
      }
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(501);
    });
};

module.exports = {
  verifyEmail,
};
