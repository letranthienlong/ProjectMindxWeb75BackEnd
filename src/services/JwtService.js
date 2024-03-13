const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateAccessToken = async (payload) => {
  const accessToken = jwt.sign({ payload }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
  return accessToken;
};

const generateRefreshToken = async (payload) => {
  const refreshToken = jwt.sign({ payload }, process.env.REFRESH_TOKEN, {
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
            status: "ERROR",
            message: "Authentication error",
          });
        }
        const { payload } = user;
        const accessToken = await generateAccessToken({
          id: payload?.id,
          isAdmin: payload?.isAdmin,
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
