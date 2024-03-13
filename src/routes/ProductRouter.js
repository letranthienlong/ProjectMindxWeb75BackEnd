const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  getDetailsProduct,
  deleteProduct,
  getAllProduct,
} = require("../controllers/ProductController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/create", createProduct);
router.put("/update/:id", authMiddleware, updateProduct);
router.get("/details/:id", getDetailsProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/list", getAllProduct);

module.exports = router;
