const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Tạo tooken với thời gian sống là 1h
const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );

  return access_token;
};

// Tạo 1 refresh tooken với thời gian sống là 1y
const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "1d" }
  );

  return refresh_token;
};

// Xác thực lại refresh tooken
const refreshTokenJwtService = (req, res) => {
  const token = req.body.refreshToken;
  jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "ERR",
        message: "Invalid refresh token",
      });
    }
    try {
      const access_token = await genneralAccessToken({
        id: user?.id,
        isAdmin: user?.isAdmin,
      });
      res.json({
        status: "OK",
        message: "SUCCESS",
        access_token,
      });
    } catch (error) {
      console.error("Error generating access token:", error);
      res.status(500).json({
        status: "ERR",
        message: "Failed to generate access token",
      });
    }
  });
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenJwtService,
};
