const models = require("../models");

// functionnal but not deployed on front end yet
const edit = (req, res) => {
  const comment = req.body;
  comment.id = parseInt(req.params.id, 10);

  models.comment
    .updateComment(comment)
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

// used to add new comments in the database
const add = (req, res) => {
  const comment = req.body;

  models.comment
    .insertComment(comment)
    .then(([result]) => {
      res
        .location(`/decision/${result.decision_id}/comments`)
        .status(201)
        .send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// functionnal but not deployed on front end yet
const destroy = (req, res) => {
  models.comment
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

module.exports = {
  edit,
  add,
  destroy,
};
