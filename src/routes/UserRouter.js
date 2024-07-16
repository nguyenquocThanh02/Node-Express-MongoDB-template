const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middlewares/authMiddleWare");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.get("/get-all", userController.getAllUser);
router.get("/get-details/:id", authMiddleWare, userController.getDetailsUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", authMiddleWare, userController.deleteUser);

module.exports = router;
