const getAllProductsStatic = async (req, res) => {
  throw Error('testing asunc package');
  // res.status(200).json({ msg: 'products testing route' });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products route' });
};

export { getAllProductsStatic, getAllProducts };
