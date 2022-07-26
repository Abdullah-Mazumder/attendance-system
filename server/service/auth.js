const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { findUserByProperty, createNewUser } = require("./user");
const error = require("./../utils/error");

const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);

  if (user) {
    throw error("User already exist", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 11);

  return createNewUser({ name, email, password: hashedPassword });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) {
    throw error("invalid input", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw error("invalid input", 400);
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accoutStatus: user.accountStatus,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

module.exports = {
  registerService,
  loginService,
};
