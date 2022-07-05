const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const search = 'ab'; // products that have at least an ab in the name
  const products = await Product.find({
    name: { $regex: search, $options: 'i' },
  });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  //this way if any query params are passed that are not featured in our object we get sent back the whole object unfiltered
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
