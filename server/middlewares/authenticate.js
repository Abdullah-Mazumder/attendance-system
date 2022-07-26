const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authenticate = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "authorization failed" });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "authorization failed" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: "authorization failed" });
  }
};

module.exports = authenticate;
