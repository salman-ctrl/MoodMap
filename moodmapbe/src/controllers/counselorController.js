const Counselor = require('../models/Counselor');
const ApiResponse = require('../utils/response');

exports.getAllCounselors = async (req, res, next) => {
  try {
    const counselors = await Counselor.getAll();
    ApiResponse.success(res, 'Counselors retrieved', counselors);
  } catch (error) {
    next(error);
  }
};

exports.getCounselorById = async (req, res, next) => {
  try {
    const counselor = await Counselor.findById(req.params.id);
    if (!counselor) {
      return ApiResponse.error(res, 'Counselor not found', 404);
    }
    ApiResponse.success(res, 'Counselor retrieved', counselor);
  } catch (error) {
    next(error);
  }
};