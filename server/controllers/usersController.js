const User = require("../models/User");
const userService = require("../service/userService");
const authService = require("./../service/authService");
const error = require("../utils/error");

const getUsers = async (_req, res, next) => {
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const putUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, roles, accountStatus } = req.body;

  try {
    const user = await userService.updateUser(userId, {
      name,
      email,
      roles,
      accountStatus,
    });

    if (!user) {
      throw error("User not found", 404);
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    next(e);
  }
};

const deleteUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("User not found", 400);
    }

    await user.remove();
    return res.status(203).json({ message: "User delete successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
