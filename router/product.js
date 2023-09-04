const express = require("express");
const { verifyAdmin } = require("../middleware/verifyToken");
const {
  addProductValidation,
  updateProductValidation,
} = require("../middleware/product");
const {
  addProduct,
  updateProduct,
  getProduct,
} = require("../controller/product");
const router = express.Router();

router.post("/", verifyAdmin, addProductValidation, addProduct);
router.put("/", verifyAdmin, updateProductValidation, updateProduct);
router.get("/", getProduct);

module.exports = router;
