const express = require("express");
const { verifyUser } = require("../middleware/verifyToken");
const transactionValidation = require("../middleware/transaction");
const createTransaction = require("../controller/transaction");
const router = express.Router();

router.post("/:id", verifyUser, transactionValidation, createTransaction);

module.exports = router;
