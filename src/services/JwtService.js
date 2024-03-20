const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateAccessToken = async (payload) => {
  const accessToken = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "30s",
  });
  return accessToken;
};

const generateRefreshToken = async (payload) => {
  const refreshToken = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });
  return refreshToken;
};

const refreshTokenJwtService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          console.log("err", err);
          resolve({
            status: "ERR",
            message: "Authentication error",
          });
        }
        const accessToken = await generateAccessToken({
          id: user.payload?.id,
          isAdmin: user.payload?.isAdmin,
        });
        resolve({
          status: "OK",
          message: "SUCCESS",
          access_token: accessToken,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshTokenJwtService,
};
