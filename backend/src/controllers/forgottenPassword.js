const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  models.user
    .selectEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];

        next();
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(501);
    });
};

const createToken = (req, res, next) => {
  const { user } = req;
  user.passwordToken = uuidv4();

  models.user
    .updateForgottenPassword(user)
    .then(() => {
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(501);
    });
};

// Verify if the tokenPassword exist
const verifyTokenPassword = (req, res, next) => {
  const { passwordToken } = req.body;

  models.user
    .selectToken(passwordToken)
    .then(([users]) => {
      if (users[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];

        next();
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(501);
    });
};

// Create and hash a new password
const resetPassword = (req, res) => {
  const { user } = req;
  user.hashedPassword = req.body.hashedPassword;

  models.user
    .updatePasswordAfterReset(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  createToken,
  verifyEmail,
  verifyTokenPassword,
  resetPassword,
};
