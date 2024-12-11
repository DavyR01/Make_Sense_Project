const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
require("../config/config");

const avatarDirectory = process.env.UPLOAD_DIR;

const renameAvatar = (req, res, next) => {
  const { originalname } = req.file;

  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();

  // Cliquer sur rename pour voir les paramètres associés à la fonction rename
  fs.rename(
    `${avatarDirectory}${filename}`,
    `${avatarDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.avatar = `${uuid}-${originalname}`;
      next();
    }
  );
};

const sendAvatar = (req, res) => {
  const { fileName } = req.params;

  res.download(avatarDirectory + fileName, fileName, (err) => {
    if (err) {
      res.status(404).send({
        message: `Avatar not found.`,
      });
    }
  });
};

module.exports = { renameAvatar, sendAvatar };
