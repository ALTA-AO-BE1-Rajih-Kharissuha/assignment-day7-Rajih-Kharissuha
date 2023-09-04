const product = require("../models/product");
const logger = require("./logger");

const addProductValidation = async (req, res, next) => {
  const { nama, description, stok } = req.body;

  if (!nama) {
    logger.warn("nama cannot be empty", {
      status: 400,
      request: { method: "POST", path: "/product" },
    });
    return res
      .status(400)
      .json({ status: 400, message: "nama cannot be empty" });
  }

  if (!stok) {
    logger.warn("Minimum stock 1", {
      status: 400,
      request: { method: "POST", path: "/product" },
    });
    return res.status(400).json({ status: 400, message: "Minimum stock 1" });
  } else if (isNaN(stok)) {
    logger.warn("Stock can only be filled with numbers", {
      status: 400,
      request: { method: "POST", path: "/product" },
    });
    return res
      .status(400)
      .json({ status: 400, message: "Stock can only be filled with numbers" });
  }

  next();
};

const updateProductValidation = async (req, res, next) => {
  const { id } = req.query;
  const { stok } = req.body;

  const findProduct = await product.findOne({ _id: id });
  if (!findProduct) {
    logger.warn("Product Not Found", {
      status: 404,
      request: { method: "PUT", path: `/product/${id}` },
    });
    return res.status(404).json({ status: 404, message: `Product Not Found` });
  }

  if (stok[0] === "-") {
    next();
  } else if (stok[0] === "+") {
    next();
  } else {
    logger.warn("stock must begin with - or +", {
      status: 400,
      request: { method: "PUT", path: `/product/${id}` },
    });
    return res
      .status(400)
      .json({ status: 400, message: `stock must begin with - or +` });
  }
};

module.exports = { addProductValidation, updateProductValidation };
