const user = require("../models/user");
const logger = require("./logger");

const registerValidation = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  // username tidak boleh kosong
  if (!username) {
    logger.warn("username cannot be empty", {
      status: 400,
      request: { method: "POST", path: "/users" },
    });
    return res
      .status(400)
      .json({ status: 400, message: "username cannot be empty" });
  }

  // format email tidak boleh salah
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!checkEmail) {
    logger.warn("invalid email format", {
      status: 400,
      request: { method: "POST", path: "/users" },
    });
    return res
      .status(400)
      .json({ status: 400, message: "invalid email format" });
  }

  //   format password
  const checkPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  if (!checkPassword) {
    logger.warn(
      "The password must consist of 8 characters, 1 capital, 1 letter, and 1 symbol",
      {
        status: 400,
        request: { method: "POST", path: "/users" },
      }
    );
    return res.status(400).json({
      status: 400,
      message:
        "The password must consist of 8 characters, 1 capital, 1 letter, and 1 symbol",
    });
  }

  if (!role) {
    logger.warn("role cannot be empty", {
      status: 400,
      request: { method: "POST", path: "/users" },
    });
    return res
      .status(400)
      .json({ status: 400, message: "role cannot be empty" });
  } else if (role === "user" || role === "admin") {
    next();
  } else {
    logger.warn("role can only be filled in user or admin", {
      status: 400,
      request: { method: "POST", path: "/users" },
    });
    return res.status(400).json({
      status: 400,
      message: "role can only be filled in user or admin",
    });
  }
};

const loginValidation = async (req, res, next) => {
  const { username, password } = req.body;

  const findUser = await user.findOne({
    $or: [{ username: username }, { email: username }],
  });

  if (!findUser) {
    logger.warn(`User ${username} Not Found`, {
      status: 404,
      request: { method: "POST", path: "/users/login" },
    });
    return res
      .status(404)
      .json({ status: 404, message: `User ${username} Not Found` });
  }

  next();
};

module.exports = { registerValidation, loginValidation };
