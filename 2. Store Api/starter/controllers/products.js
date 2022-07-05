const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(4) // only shows these 2 fields in our response
    .skip(1); //we start with item 2
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
  const page = Number(req.query.page) || 1; //page is currente page we're on not nr of pages
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  //23 products
  //23/7(limit) = 4pages

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
