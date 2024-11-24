const { formatResponse } = require("./responseFormatter");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation
  if (err.name === "ValidationError") {
    return res.status(400).json(
      formatResponse(
        false,
        "Validation Error",
        Object.values(err.errors).map((e) => e.message)
      )
    );
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res
      .status(400)
      .json(
        formatResponse(false, "Duplicate Entry", "This entry already exists")
      );
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    return res
      .status(401)
      .json(formatResponse(false, "Invalid Token", "Token validation failed"));
  }

  // OAuth2 error
  if (err.name === "OAuth2Error") {
    return res
      .status(400)
      .json(formatResponse(false, "OAuth Error", err.message));
  }

  // Default error
  return res
    .status(500)
    .json(
      formatResponse(
        false,
        "Internal Server Error",
        process.env.NODE_ENV === "development" ? err.message : null
      )
    );
};

module.exports = errorHandler;
