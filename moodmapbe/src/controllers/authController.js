const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Setting = require('../models/Setting');
const jwtConfig = require('../config/jwt');
const ApiResponse = require('../utils/response');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return ApiResponse.error(res, 'Email already registered', 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = await User.create({
      name,
      email,
      password: hashedPassword,
      phone
    });

    // Create default settings
    await Setting.create(userId);

    // Get user data
    const user = await User.findById(userId);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    ApiResponse.success(res, 'Registration successful', { user, token }, 201);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return ApiResponse.error(res, 'Invalid credentials', 401);
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return ApiResponse.error(res, 'Invalid credentials', 401);
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Remove password from response
    delete user.password;

    ApiResponse.success(res, 'Login successful', { user, token });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    // In stateless JWT, we just return success
    // Client should remove the token
    ApiResponse.success(res, 'Logout successful');
  } catch (error) {
    next(error);
  }
};