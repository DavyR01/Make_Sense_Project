const nodemailer = require("nodemailer");
// require("../config/config");

const { FRONTEND_URL } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  /*  auth: {
    user:
    pass: 
  }, */
});

const sendForgottenPassword = (req) => {
  transporter.sendMail(
    {
      to: req.user.email,
      subject: "Réinitialisation de votre mot de passe.",
      text: `Vous souhaitez réinitialiser votre mot de passe ? ${FRONTEND_URL}`,
      html: `<a href="${FRONTEND_URL}/reviewpassword/${req.user.passwordToken}">Cliquez ici</a>`,
    },
    (err) => {
      if (err) console.error(err);
    }
  );
};

module.exports = { sendForgottenPassword };
