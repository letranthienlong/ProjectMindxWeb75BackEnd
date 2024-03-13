const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
} = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.put("/edit/:id", updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get("/list", authMiddleware, getAllUser);
router.get("/info/:id", authUserMiddleware, getDetailsUser);
router.post("/refresh", refreshToken);

module.exports = router;
