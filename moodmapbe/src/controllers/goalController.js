const Goal = require('../models/Goal');
const ApiResponse = require('../utils/response');

exports.createGoal = async (req, res, next) => {
  try {
    const { title, description, color, progress, parent_id } = req.body;
    const userId = req.user.id;

    const goalId = await Goal.create({
      user_id: userId,
      title,
      description,
      color,
      progress,
      parent_id
    });

    const goal = await Goal.findById(goalId);
    ApiResponse.success(res, 'Goal created', goal, 201);
  } catch (error) {
    next(error);
  }
};

exports.getGoals = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const goals = await Goal.findByUserId(userId);
    ApiResponse.success(res, 'Goals retrieved', goals);
  } catch (error) {
    next(error);
  }
};

exports.updateGoal = async (req, res, next) => {
  try {
    const { title, description, color, progress } = req.body;
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return ApiResponse.error(res, 'Goal not found', 404);
    }
    if (goal.user_id !== req.user.id) {
      return ApiResponse.error(res, 'Access denied', 403);
    }

    const updatedGoal = await Goal.update(req.params.id, {
      title,
      description,
      color,
      progress
    });

    ApiResponse.success(res, 'Goal updated', updatedGoal);
  } catch (error) {
    next(error);
  }
};

exports.deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return ApiResponse.error(res, 'Goal not found', 404);
    }
    if (goal.user_id !== req.user.id) {
      return ApiResponse.error(res, 'Access denied', 403);
    }

    await Goal.delete(req.params.id);
    ApiResponse.success(res, 'Goal deleted');
  } catch (error) {
    next(error);
  }
};