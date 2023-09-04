const logger = require("../middleware/logger");
const product = require("../models/product");

const addProduct = async (req, res) => {
  const { nama, description, stok } = req.body;

  try {
    await product.create({ nama, description, stok });
    logger.info("Success add Product", {
      status: 200,
      request: { method: "POST", path: "/product" },
    });
    return res
      .status(200)
      .json({ status: 200, message: "Success add Product" });
  } catch (error) {
    logger.error(error, {
      status: 404,
      request: { method: "POST", path: "/product" },
    });
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const { nama, description, stok } = req.body;
  const { id } = req.query;

  try {
    const findProduct = await product.findOne({ _id: id });
    await product.updateOne(
      { _id: id },
      {
        nama: nama || findProduct.nama,
        description: description || findProduct.description,
        stok:
          stok[0] === "-"
            ? Number(findProduct.stok) - Number(stok.slice(1)) <= 0
              ? 1
              : Number(findProduct.stok) - Number(stok.slice(1))
            : Number(findProduct.stok) + Number(stok.slice(1)),
      }
    );
    logger.info("Success update Product", {
      status: 200,
      request: { method: "PUT", path: `/product/${id}` },
    });
    return res
      .status(200)
      .json({ status: 200, message: "Success update Product" });
  } catch (error) {
    logger.error(error, {
      status: 404,
      request: { method: "PUT", path: `/product/${id}` },
    });
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const find = await product.find();
    if (find.length < 1) {
      logger.warn("Not Found", {
        status: 404,
        request: { method: "GET", path: `/product` },
      });
      return res.status(404).json({ status: 404, message: "Not Found" });
    } else {
      logger.info("data", {
        status: 200,
        request: { method: "GET", path: `/product` },
      });
      return res.status(200).json({ status: 200, data: find });
    }
  } catch (error) {
    logger.error(error, {
      status: 404,
      request: { method: "GET", path: `/product` },
    });
    console.log(error);
  }
};

module.exports = { addProduct, updateProduct, getProduct };
