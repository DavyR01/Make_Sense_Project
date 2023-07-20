require("dotenv").config();
const nodemailer = require("nodemailer");

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
      text: "Vous souhaitez réinitialiser votre mot de passe ? http://localhost:3000",
      html: `<a href="http://localhost:3000/reviewpassword/${req.user.passwordToken}">Cliquez ici</a>`,
    },
    (err) => {
      if (err) console.error(err);
    }
  );
};

module.exports = { sendForgottenPassword };
