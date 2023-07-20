const models = require("../models");

const browseMessage = (req, res) => {
  models.message_help
    .findAll()
    .then(([result]) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addMessage = (req, res) => {
  models.message_help
    .insertMessage(req.body)
    .then(([result]) => {
      res.location(`/admin/message/${result.id}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteMessage = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.message_help
    .deleteMessage(id)
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
  browseMessage,
  addMessage,
  deleteMessage,
};
