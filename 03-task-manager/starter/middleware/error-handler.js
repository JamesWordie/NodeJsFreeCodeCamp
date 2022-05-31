const { CustomAPIError } = require("../errors/custom-error");
const errorHandlerMiddleWare = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({
    message: "Something has gone wrong with the request, please try again.",
    error: err,
  });
};

module.exports = errorHandlerMiddleWare;
