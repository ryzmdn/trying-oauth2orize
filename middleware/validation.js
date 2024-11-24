const { body, validationResult } = require("express-validator");
const { formatResponse } = require("../utils/responseFormatter");

exports.validateLogin = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

exports.validateUserUpdate = [
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("username")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  handleValidationErrors,
];

exports.validateClientCreation = [
  body("name").trim().notEmpty().withMessage("Client name is required"),
  body("redirectUri")
    .trim()
    .notEmpty()
    .isURL()
    .withMessage("Valid redirect URI is required"),
  handleValidationErrors,
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(formatResponse(false, "Validation error", errors.array()));
  }
  next();
}
