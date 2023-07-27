const express = require("express");
const multer = require("multer");

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
const decisionController = require("./controllers/decisionController");
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
router.get("/user", verifyToken, userControllers.browse);
router.get("/user/bytoken", verifyToken, userControllers.readByToken);

// Permet d'afficher les personnes expertes et impactées lors de la création ou de l'édition d'une décision
router.get("/user/byname", userControllers.readName);
router.get("/user/:id", verifyToken, userControllers.read);

router.post(
  "/user",
  validateUserInscription,
  verifyEmail,
  hashPassword,
  userControllers.add
);

router.put("/user/:id", verifyToken, validatorProfile, userControllers.edit);

router.delete("/user/:id", userControllers.destroy);

// Route for login ******************************************
router.post(
  "/login",
  validateUserConnexion,
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Forgotten Password *******************************************
router.post(
  "/forgottenpassword",
  forgottenPassword.verifyEmail,
  forgottenPassword.createToken,
  mailController.sendForgottenPassword
);

router.post(
  "/resetpassword",
  forgottenPassword.verifyTokenPassword,
  hashPassword,
  forgottenPassword.resetPassword
);

// Routes for decision ***************************************

// Affichage sur la page Accueil
router.get("/decision", verifyToken, decisionController.readAll);

// Affichage sur la page Décisions
router.get(
  "/decision/page",
  verifyToken,
  decisionController.readAllByPageAndFilter
);

router.get(
  "/decision/listadminbypage",
  verifyToken,
  decisionController.browseAllByPageAndFilter
);

// Affichage sur Stepper Timeline sur page Accueil et Décisions
router.get("/decision/last", verifyToken, decisionController.readByLast);

router.get("/decision/:id", verifyToken, decisionController.read);

// Sert à afficher les décisions d'un user sur son profil
router.get(
  "/decision-byuser/:id",
  verifyToken,
  decisionController.readDecisionByUserId
);

router.post(
  "/decision",
  verifyToken,
  validatorDecision,
  decisionController.add
);

router.put(
  "/decision/:id",
  verifyToken,
  validatorEditDecision,
  decisionController.edit
);

router.delete("/decision/:id", verifyToken, decisionController.destroy);

// Routes for update avatar **********************************
router.get("/avatar/:fileName", fileControllers.sendAvatar);

router.post(
  "/avatar",
  verifyToken,
  upload.single("avatar"),
  fileControllers.renameAvatar,
  userControllers.updateAvatar
);

// the following routes are used to add/update/delete comments from a chosen decision

router.post(
  "/decision/:id/comments",
  verifyToken,
  validatorComment,
  commentControllers.add
);

router.put("/decision/:id/comments/:id", verifyToken, commentControllers.edit);

// Route for notification *********************************************
router.get("/notification/:id", verifyToken, notificationControllers.browse);

// Route for admin **********************************************
router.get("/admin/countstats", adminControllers.browseCount);

// Route for message *********************************************
router.get("/admin/message", messageControllers.browseMessage);
router.post("/admin/addmessage", messageControllers.addMessage);
router.delete("/admin/message/:id", messageControllers.deleteMessage);

module.exports = router;
