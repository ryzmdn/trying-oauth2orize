const passport = require("passport");
const { formatResponse } = require("../utils/responseFormatter");

exports.authenticateJWT = passport.authenticate("bearer", { session: false });

exports.requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user.roles.includes(role)) {
      return res
        .status(403)
        .json(formatResponse(false, "Insufficient permissions", null));
    }
    next();
  };
};

exports.requireScope = (scope) => {
  return (req, res, next) => {
    if (!req.user.scope.includes(scope)) {
      return res
        .status(403)
        .json(formatResponse(false, "Insufficient scope", null));
    }
    next();
  };
};

exports.isOwner = (paramName) => {
  return (req, res, next) => {
    const resourceId = req.params[paramName];
    if (resourceId !== req.user.id) {
      return res
        .status(403)
        .json(formatResponse(false, "Unauthorized access", null));
    }
    next();
  };
};
