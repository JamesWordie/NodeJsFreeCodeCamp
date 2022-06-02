const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30, $lt: 60 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ products, noProducts: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // Filter
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.trim().split("-");
      if (options.includes(field)) {
        // Allows for a range value, ie 30<price<60 -->  price: { '$gt': 30, '$lt': 60 }
        queryObject[field] =
          queryObject[field] === undefined
            ? { [operator]: Number(value) }
            : { ...queryObject[field], [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  // Fields//Filter (field selector)
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  // Sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, noProducts: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
