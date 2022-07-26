const { registerService, loginService } = require("../service/authService");

const registerPostController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "invalid data" });
  }

  try {
    const user = await registerService({ name, email, password });
    return res.status(200).json({ message: "user created successfully", user });
  } catch (error) {
    next(error);
  }
};

const loginPostController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginService({ email, password });
    return res.status(200).json({ message: "login successfull", token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerPostController,
  loginPostController,
};
