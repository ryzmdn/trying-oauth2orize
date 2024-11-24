const User = require("../models/user");
const { formatResponse } = require("../utils/responseFormatter");

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(formatResponse(true, "User retrieved successfully", user));
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    const user = await User.findById(req.user.id);

    if (email) user.email = email;
    if (username) user.username = username;

    await user.save();
    res.json(formatResponse(true, "User updated successfully", user));
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(formatResponse(true, "Users retrieved successfully", users));
  } catch (err) {
    next(err);
  }
};
