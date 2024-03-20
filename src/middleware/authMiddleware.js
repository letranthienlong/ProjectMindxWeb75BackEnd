const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const sendAuthError = (res) => {
  return res.status(401).json({
    message: "Authentication failed",
    status: "ERROR",
  });
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err || !user?.isAdmin) {
      return sendAuthError(res);
    }
    next();
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err || !(user?.isAdmin || user?.id === userId)) {
      return sendAuthError(res);
    }
    next();
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
};
