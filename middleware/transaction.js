const product = require("../models/product");
const user = require("../models/user");
const logger = require("./logger");

const transactionValidation = async (req, res, next) => {
  const { qty } = req.body;
  const { username } = req.user;
  const { id } = req.params;

  if (!qty) {
    logger.warn("quantity cannot be empty", {
      status: 400,
      request: { method: "POST", path: "/transaction" },
    });
    return res
      .status(400)
      .json({ status: 400, message: "quantity cannot be empty" });
  } else if (isNaN(qty)) {
    logger.warn("Quantity can only be filled with numbers", {
      status: 400,
      request: { method: "POST", path: "/transaction" },
    });
    return res.status(400).json({
      status: 400,
      message: "Quantity can only be filled with numbers",
    });
  }

  const findUser = await user.findOne({ username: username });
  if (!findUser) {
    logger.warn("User Not Found", {
      status: 404,
      request: { method: "POST", path: "/transaction" },
    });
    return res.status(404).json({ status: 404, message: "User Not Found" });
  }

  const findProduct = await product.findOne({
    _id: id,
  });
  if (!findProduct) {
    logger.warn("Product Not Found", {
      status: 404,
      request: { method: "POST", path: "/transaction" },
    });
    return res.status(404).json({ status: 404, message: "Product Not Found" });
  }

  if (Number(qty) > Number(findProduct.stok)) {
    logger.warn("Insufficient product stock", {
      status: 400,
      request: { method: "POST", path: "/transaction" },
    });
    return res
      .status(400)
      .json({ status: 400, message: "Insufficient product stock" });
  }

  req.transaction = {
    idProduct: findProduct.id,
    idUser: findUser.id,
    stok: findProduct.stok,
  };
  next();
};

module.exports = transactionValidation;
