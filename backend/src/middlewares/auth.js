require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

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

      const token = jwt.sign(payload, JWT_SECRET, {
        algorithm: "HS512",
        expiresIn: "12h",
      });

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

    req.payload = await jwt.verify(token, JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
