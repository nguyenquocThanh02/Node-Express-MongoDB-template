const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Kiểm tra quyền admin bằng xác thực tooken
const authMiddleWare = (req, res, next) => {
  // Nhận tooken của header từ request
  const token = req.headers.token.split(" ")[1];

  // Kiểm tra quyền admin
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication1",
        status: "ERROR",
      });
    }
    console.log(user);
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "Permition admin role",
        status: "ERROR",
      });
    }
  });
};

// Xác thực user
const authUserMiddleWare = (req, res, next) => {
  const token = req.headers?.token?.split(" ")[1] || null;
  if (!token) {
    return res.status(401).json({
      message: "Token is not defined!",
      status: "ERROR",
    });
  }
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }
    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(401).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};
