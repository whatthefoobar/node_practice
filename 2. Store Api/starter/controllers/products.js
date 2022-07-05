const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price'); // only shows these 2 fields in our response
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
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

  //console.log(queryObject);
  let result = Product.find(queryObject);
  if (sort) {
    // products = products.sort();
    console.log(sort);
    const sortList = sort.split(',').join(' '); // to have all our sort terms added with space in between like so .sort('-name price');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  //fields only shows selected fields from the response object
  if (fields) {
    const fieldsList = fields.split(',').join(' '); // to have all our sort terms added with space in between like so .sort('-name price');
    result = result.select(fieldsList);
  } else {
    result = result.sort('createdAt');
  }
  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
