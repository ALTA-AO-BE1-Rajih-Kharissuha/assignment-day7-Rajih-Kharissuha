const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transaction = require("../models/transaction");
const logger = require("../middleware/logger");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const create = await user.create({
      username,
      email,
      password: hashPassword,
      role: role,
    });

    logger.info("Success Register", {
      status: 200,
      request: { method: "POST", path: "/users" },
    });
    return res.status(201).json({ status: 201, message: "Success Register" });
  } catch (error) {
    logger.error("This username is already in use", {
      status: 400,
      request: { method: "POST", path: "/users" },
    });
    return res
      .status(400)
      .json({ status: 400, message: "This username is already in use" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await user.findOne({
      $or: [{ username: username }, { email: username }],
    });

    const compare = await bcrypt.compare(password, findUser.password);
    if (!compare) {
      logger.warn("password wrong", {
        status: 400,
        request: { method: "POST", path: "/users/login" },
      });
      return res.status(400).json({ status: 400, message: "password wrong" });
    }

    const accessToken = jwt.sign(
      {
        email: findUser.email,
        username: findUser.username,
        role: findUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "600s",
      }
    );
    logger.info("token", {
      status: 200,
      request: { method: "POST", path: "/users/login" },
    });
    return res.status(200).json({ token: accessToken });
  } catch (error) {
    logger.error(error, {
      status: 404,
      request: { method: "POST", path: "/users/login" },
    });
    console.log(error);
  }
};

const history = async (req, res) => {
  try {
    const findUser = await user.findOne({
      username: req.user.username,
    });
    const find = await transaction.find({
      idUser: findUser.id,
    });

    if (find.length < 1) {
      logger.warn("History Not Found", {
        status: 404,
        request: { method: "GET", path: "/users" },
      });
      return res
        .status(404)
        .json({ status: 404, message: "History Not Found" });
    } else {
      logger.info("data", {
        status: 200,
        request: { method: "GET", path: "/users" },
      });
      return res.status(200).json({ status: 200, data: find });
    }
  } catch (error) {
    logger.error(error, {
      status: 404,
      request: { method: "GET", path: "/users" },
    });
    console.log(error);
  }
};
module.exports = { register, login, history };
