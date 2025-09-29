const express = require("express");
const multer = require("multer");
// require("./config/config");

const upload = multer({ dest: process.env.UPLOAD_DIR });
const router = express.Router();

// call middleware ******************************************
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./middlewares/auth");
const { verifyEmail } = require("./middlewares/verifyEmail");

// call controller ******************************************
const authControllers = require("./controllers/authController");
const userControllers = require("./controllers/userControllers");
const decisionControllers = require("./controllers/decisionController");
const fileControllers = require("./controllers/fileController");
const forgottenPassword = require("./controllers/forgottenPassword");
const mailController = require("./controllers/mailController");
const commentControllers = require("./controllers/commentController");
const notificationControllers = require("./controllers/notificationController");
const adminControllers = require("./controllers/adminController");
const messageControllers = require("./controllers/messageController");

// call validator ******************************************
const { validatorDecision } = require("./validators/validatorDecision");
const { validatorEditDecision } = require("./validators/validatorEditDecision");
const {
  validateUserInscription,
} = require("./validators/validatorUserInscription");
const { validatorProfile } = require("./validators/validatorProfile");
const { validatorComment } = require("./validators/validatorComment");
const {
  validateUserConnexion,
} = require("./validators/validatorUserConnexion");

// routes for user ******************************************
router.get("/api/user", verifyToken, userControllers.browse);
router.get("/api/user/bytoken", verifyToken, userControllers.findByToken);
router.get("/api/user/byname", (req, res) => {
  //   console.log("Requête reçue pour /api/user/byname"); // Log de la requête
  userControllers.browseByName(req, res);
});
router.get("/api/user/:id", verifyToken, userControllers.read);
router.put(
  "/api/user/:id",
  verifyToken,
  validatorProfile,
  userControllers.edit
);
router.post(
  "/api/user",
  validateUserInscription,
  verifyEmail,
  hashPassword,
  userControllers.add
);
router.delete("/api/user/:id", userControllers.destroy);

// Route for login ******************************************
router.post(
  "/api/login",
  validateUserConnexion,
  authControllers.checkMailUser,
  verifyPassword
);

// Route for token verification ****************************
router.get("/api/verify-token", verifyToken, (req, res) => {
  // Si on arrive ici, c'est que le token est valide (verifyToken a réussi)
  res.status(200).json({ message: "Token valid", userId: req.payload.sub });
});

// Forgotten Password *******************************************
router.post(
  "/api/forgottenpassword",
  forgottenPassword.verifyEmail,
  forgottenPassword.createToken,
  mailController.sendForgottenPassword
);

router.post(
  "/api/resetpassword",
  forgottenPassword.verifyTokenPassword,
  hashPassword,
  forgottenPassword.resetPassword
);

// Routes for decision ***************************************
router.get("/api/decision", verifyToken, decisionControllers.browse);
router.get(
  "/api/decision/page",
  verifyToken,
  decisionControllers.browseByPageAndFilter
);
router.get(
  "/api/decision/listadminbypage",
  verifyToken,
  decisionControllers.browseAllByPageAndFilter
);
router.get("/api/decision/last", verifyToken, decisionControllers.readByLast);
router.get("/api/decision/:id", verifyToken, decisionControllers.read);

// Sert à afficher les décisions d'un user sur son profil
router.get(
  "/api/decision-byuser/:id",
  verifyToken,
  decisionControllers.readDecisionByUserId
);

router.put(
  "/api/decision/:id",
  verifyToken,
  validatorEditDecision,
  decisionControllers.edit
);
router.post(
  "/api/decision",
  verifyToken,
  validatorDecision,
  decisionControllers.add
);
router.delete("/api/decision/:id", verifyToken, decisionControllers.destroy);

// Routes for update avatar **********************************
router.post(
  "/api/avatar",
  verifyToken,
  upload.single("avatar"),
  fileControllers.renameAvatar,
  userControllers.updateAvatar
);
router.get("/api/avatar/:fileName", fileControllers.sendAvatar);

// the following routes are used to add/update/delete comment from a chosen decision
router.put(
  "/api/decision/:id/comments/:id",
  verifyToken,
  commentControllers.edit
);
router.post(
  "/api/decision/:id/comments",
  verifyToken,
  validatorComment,
  commentControllers.add
);

// Route for notification *********************************************
router.get(
  "/api/notification/:id",
  verifyToken,
  notificationControllers.browse
);

// Route for admin **********************************************
router.get("/api/admin/countstats", verifyToken, adminControllers.browseCount);

// Route for message *********************************************
router.get("/api/admin/message", verifyToken, messageControllers.browseMessage);
router.post("/api/admin/addmessage", messageControllers.addMessage);
router.delete(
  "/api/admin/message/:id",
  verifyToken,
  messageControllers.deleteMessage
);

module.exports = router;
