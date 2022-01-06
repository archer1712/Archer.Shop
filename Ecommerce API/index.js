const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./Routes/user.js");
const authRoute = require("./Routes/auth.js");
const productRoute = require("./Routes/product.js");
const cartRoute = require("./Routes/cart.js");
const orderRoute = require("./Routes/order.js");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const stripeRoute = require("./Routes/stripe.js");
app.use(cors());
mongoose
  .connect(process.env.MongodbUrl, {})
  .then(() => console.log("DB Connection successful"))
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("api/cart", cartRoute);
app.use("api/order", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(5000, () => {
  console.log("Running");
});
