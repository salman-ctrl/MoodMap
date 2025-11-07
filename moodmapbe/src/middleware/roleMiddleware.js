const ApiResponse = require('../utils/response');

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(res, 'User not authenticated', 401);
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(res, 'Access denied', 403);
    }

    next();
  };
};

module.exports = { checkRole };