const models = require("../models");

const checkMailUser = (req, res, next) => {
  const { email } = req.body;

  models.user
    .selectEmail(email)
    .then(([user]) => {
      if (user[0] != null) {
        [req.user] = user;

        next();
      } else res.status(401).send({ message: "User not found" });
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(501);
    });
};

module.exports = {
  checkMailUser,
};
