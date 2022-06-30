const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // this is for a custom error middleware we'll build
    }
  };
};

module.exports = asyncWrapper;
