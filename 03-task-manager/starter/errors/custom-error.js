/**
 * @class CustomAPIError
 * @extends Error
 *
 * @params message, the error message
 * @params statusCode the status code of the error
 */
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
