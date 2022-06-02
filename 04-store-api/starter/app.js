require("dotenv").config();
require("express-async-errors");
const express = require("express");
const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productRouter = require("./routes/products");
const app = express();
app.use(express.json());

// Async Errors

// Routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
});
app.use("/api/v1/products", productRouter);

// MiddleWare
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 5001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
