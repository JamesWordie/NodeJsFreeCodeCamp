const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");

// GET routes for all and static testing
router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
