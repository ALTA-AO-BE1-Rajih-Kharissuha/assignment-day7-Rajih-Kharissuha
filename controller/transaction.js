const logger = require("../middleware/logger");
const product = require("../models/product");
const transaction = require("../models/transaction");
const user = require("../models/user");

const createTransaction = async (req, res) => {
  const { idProduct, idUser, stok } = req.transaction;
  const { qty } = req.body;

  try {
    const changeQtyProduct = await product.updateOne(
      { _id: idProduct },
      { stok: Number(stok) - Number(qty) }
    );

    const transactions = await transaction.create({
      idProduct: idProduct,
      idUser: idUser,
      qty: qty,
    });

    // const find = await transaction
    //   .findOne({ _id: transactions._id })
    //   .populate("idUser")
    //   .populate("idProduct")
    //   .exec();
    logger.info("Success Transaction", {
      status: 200,
      request: { method: "POST", path: "/transaction" },
    });
    return res
      .status(200)
      .json({ status: 200, message: "Success Transaction" });
  } catch (error) {
    logger.error(error, {
      status: 404,
      request: { method: "POST", path: "/transaction" },
    });
    console.log(error);
  }
};

module.exports = createTransaction;
