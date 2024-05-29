const jwt = require("jsonwebtoken");
const config = require("../../config/keys");

module.exports = (user) => {
  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, config.TOKEN.JWT_SECRET, {
    expiresIn: config.TOKEN.JWT_TOKEN_EXP,
  });
  return token;
};
