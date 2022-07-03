const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  const { featured } = req.query;
  const QueryObject = {};
  if (featured) {
    QueryObject.featured = featured === 'true' ? true : false;
  }
  console.log(QueryObject);
  const products = await Product.find(QueryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
