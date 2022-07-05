const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('name')
    .select('name price');

  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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
  if (numericFilters) {
    console.log(numericFilters);
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      // example price-$gt-40, rating-$gte-5
      const [field, operator, value] = item.split('-'); //example price $gt 40
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObject); //{price:{'$gt': 40}, rating : {'$gte': 5}}
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
