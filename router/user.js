const express = require("express");
const { registerValidation, loginValidation } = require("../middleware/user");
const { register, login, history } = require("../controller/user");
const { verifyUser } = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/", verifyUser, history);

module.exports = router;
