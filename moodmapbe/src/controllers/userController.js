const User = require('../models/User');
const ApiResponse = require('../utils/response');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return ApiResponse.error(res, 'User not found', 404);
    }
    ApiResponse.success(res, 'Profile retrieved', user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    
    const updatedUser = await User.update(req.user.id, { name, phone, photo });
    ApiResponse.success(res, 'Profile updated successfully', updatedUser);
  } catch (error) {
    next(error);
  }
};
