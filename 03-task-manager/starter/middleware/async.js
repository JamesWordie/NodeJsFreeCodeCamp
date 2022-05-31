// Takes in the controller function, which allows for accessibility of the express function within
const asyncWrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      // Another middleware for the errors
      next(error);
    }
  };
};

module.exports = asyncWrapper;
