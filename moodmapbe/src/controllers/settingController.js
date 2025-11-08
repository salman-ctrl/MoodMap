const Setting = require('../models/Setting');
const ApiResponse = require('../utils/response');

exports.getSettings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let settings = await Setting.findByUserId(userId);
    
    // Create default settings if not exists
    if (!settings) {
      settings = await Setting.create(userId);
    }

    ApiResponse.success(res, 'Settings retrieved', settings);
  } catch (error) {
    next(error);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedSettings = await Setting.update(userId, req.body);
    ApiResponse.success(res, 'Settings updated', updatedSettings);
  } catch (error) {
    next(error);
  }
};