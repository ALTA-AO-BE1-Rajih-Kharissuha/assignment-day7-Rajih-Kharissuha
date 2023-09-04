const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Welcome to Sequelize Express Project");
});
// Koneksi ke MongoDB
mongoose
  .connect("mongodb://mongo:27017/tokoonline", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Koneksi ke MongoDB berhasil");
    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Koneksi ke MongoDB gagal", error);
  });

const userRoute = require("./router/user");
const productRoute = require("./router/product");
const transactionRoute = require("./router/transaction");
// Middleware
app.use(express.json());

// Routes

app.use("/users", userRoute);
app.use("/product", productRoute);
app.use("/transaction", transactionRoute);

module.exports = app;
