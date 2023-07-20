/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
const models = require("../models");

/* function that retrieves data with "get" in the models */
const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByName = (req, res) => {
  models.user
    .getUserByName()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

/* function that retrieves data with "get" by id */
const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

/* function that retrieves data with "get" by token */
const findByToken = (req, res) => {
  const id = req.payload.sub;
  models.user
    .find(id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editPassword = (req, res) => {
  const email = req.params.email;
  const pass = req.body;

  models.user
    .updatePassword(email, pass)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202).send(pass);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

/* function that retrieves data with "update" by id */
const edit = (req, res) => {
  const user = req.body;

  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(202).send(user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

/* function that retrieves data with "post" */
const add = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/user/${result.insertId}`);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

/* function that retrieves data with "delete" by id */
const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateAvatar = (req, res) => {
  const id = req.payload.sub;
  const { avatar } = req;

  models.user
    .updateAvatar(id, avatar)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.status(202).send({ avatar });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  browseByName,
  read,
  edit,
  add,
  destroy,
  updateAvatar,
  findByToken,
  editPassword,
};
