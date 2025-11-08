const Notification = require('../models/Notification');
const ApiResponse = require('../utils/response');

exports.getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.findByUserId(userId);
    const unreadCount = await Notification.getUnreadCount(userId);
    
    ApiResponse.success(res, 'Notifications retrieved', {
      notifications,
      unreadCount
    });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    await Notification.markAsRead(req.params.id);
    ApiResponse.success(res, 'Notification marked as read');
  } catch (error) {
    next(error);
  }
};