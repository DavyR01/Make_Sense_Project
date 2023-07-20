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
router.get("/user", verifyToken, userControllers.browse);
router.get("/user/bytoken", verifyToken, userControllers.findByToken);
router.get("/user/byname", userControllers.browseByName);
router.get("/user/:id", verifyToken, userControllers.read);
router.put("/user/:id", verifyToken, validatorProfile, userControllers.edit);
router.post(
  "/user",
  validateUserInscription,
  verifyEmail,
  hashPassword,
  userControllers.add
);
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
router.get("/decision", verifyToken, decisionControllers.browse);
router.get(
  "/decision/page",
  verifyToken,
  decisionControllers.browseByPageAndFilter
);
router.get(
  "/decision/listadminbypage",
  verifyToken,
  decisionControllers.browseAllByPageAndFilter
);
router.get("/decision/last", verifyToken, decisionControllers.readByLast);
router.get("/decision/:id", verifyToken, decisionControllers.read);
router.get(
  "/decision-byuser/:id",
  verifyToken,
  decisionControllers.readDecisionByUserId
);
router.put(
  "/decision/:id",
  verifyToken,
  validatorEditDecision,
  decisionControllers.editById
);
router.post(
  "/decision",
  verifyToken,
  validatorDecision,
  decisionControllers.add
);
router.delete("/decision/:id", verifyToken, decisionControllers.destroy);

// Routes for update avatar **********************************
router.post(
  "/avatar",
  verifyToken,
  upload.single("avatar"),
  fileControllers.renameAvatar,
  userControllers.updateAvatar
);
router.get("/avatar/:fileName", fileControllers.sendAvatar);

// the following routes are used to add/update/delete comment from a chosen decision
router.put("/decision/:id/comments/:id", verifyToken, commentControllers.edit);
router.post(
  "/decision/:id/comments",
  verifyToken,
  validatorComment,
  commentControllers.add
);

// Route for notification *********************************************
router.get("/notification/:id", verifyToken, notificationControllers.browse);

// Route for admin **********************************************
router.get("/admin/countstats", adminControllers.browseCount);

// Route for message *********************************************
router.get("/admin/message", messageControllers.browseMessage);
router.post("/admin/addmessage", messageControllers.addMessage);
router.delete("/admin/message/:id", messageControllers.deleteMessage);

module.exports = router;
