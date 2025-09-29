// require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

require("../config/config");
// const config = require("../config/config");
// console.log(config);

const { JWT_SECRET, JWT_TIMING } = process.env;

//* ************** Handle secret key rotation ********************
let activeSecrets = [];

function generateNewSecret() {
  return crypto.randomBytes(32).toString("hex");
}

function getLatestSecret() {
  return activeSecrets[0].value;
}

function initializeSecrets() {
  // Utilise JWT_SECRET comme secret principal + secrets rotatifs
  activeSecrets = [
    {
      id: `baseSecret`,
      value: JWT_SECRET, // Secret fixe depuis .env (survit aux redémarrages)
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
    },
    {
      id: `currentSecret${Date.now()}`,
      value: generateNewSecret(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
    {
      id: `oldSecret${Date.now() - 1}`,
      value: generateNewSecret(),
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    },
  ];
  //   console.log("initialize active Secrets : ", activeSecrets);
}

function rotateSecrets() {
  const newSecret = generateNewSecret();
  //!   console.log("New secret : ", newSecret);

  // Ajoute un nouveau secret rotatif (garde toujours JWT_SECRET en premier)
  activeSecrets.splice(1, 0, {
    id: `secret${Date.now()}`,
    value: newSecret,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  //   console.log("active Secrets in rotate : ", activeSecrets);

  // ? Remove expired secrets (garde toujours JWT_SECRET)
  const now = new Date();
  const baseSecret = activeSecrets[0]; // Garde JWT_SECRET
  const validSecrets = activeSecrets.slice(1).filter((secret) => secret.expiresAt > now);
  
  activeSecrets = [baseSecret, ...validSecrets];

  // ? Keep only 5 secrets max (1 base + 4 rotatifs)
  if (activeSecrets.length > 5) {
    activeSecrets = activeSecrets.slice(0, 5);
  }
  //!   console.log("Active Secrets after rotation: ", activeSecrets);
}

initializeSecrets();

setInterval(rotateSecrets, 15 * 24 * 60 * 60 * 1000); // ? Automatic rotation every 15 days.

//* ************** END Handle secret key rotation ********************

// ? Salt unique et aléatoire généré par argon2 automatiquement à chaque changement de mot de passe.
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, hashingOptions);
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const verifyPassword = async (req, res) => {
  try {
    const isVerified = await argon2.verify(
      req.user.hashedPassword,
      req.body.password,
      hashingOptions
    );
    if (isVerified) {
      const payload = { sub: req.user.id };
      // console.log("PAYLOAD :", payload);

      const token = jwt.sign(payload, getLatestSecret(), {
        algorithm: "HS512",
        expiresIn: JWT_TIMING,
      });

      // console.log(req.body.password);
      // console.log(req.user.hashedPassword);

      delete req.body.password;
      delete req.user.hashedPassword;
      res.send({ token, user: req.user });
    } else {
      res.status(401).send({ message: "Wrong password" });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    let tokenExpired = false;
    const tokenVerified = activeSecrets.some((secret) => {
      try {
        req.payload = jwt.verify(token, secret.value, {
          ignoreExpiration: false, // Force expiration check
        });
        return true;
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          tokenExpired = true;
          return false; // Continue to check other secrets
        }
        return false; // Continue to next secret
      }
    });

    if (tokenExpired) {
      return res.status(401).json({
        message: "Token expired",
        code: "TOKEN_EXPIRED",
        action: "CLEAR_TOKEN", // Signal to client to remove token
      });
    }

    if (!tokenVerified) {
      return res.status(401).json({ message: "Invalid token" });
    }

    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
