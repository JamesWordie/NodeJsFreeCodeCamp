require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Product.deleteMany(); // clear any previous tasks in the db
    await Product.create(jsonProducts); // seed the sample data to the db
    console.log("Successfully connected to DB");
    process.exit(0); // close the process with no errors
  } catch (error) {
    console.log(error);
    process.exit(1); // close the process with an error
  }
};

start();
