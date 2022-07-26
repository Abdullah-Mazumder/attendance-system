const router = require("express").Router();

const {
  registerPostController,
  loginPostController,
} = require("./../controllers/authController");

router.post("/register", registerPostController);

router.post("/login", loginPostController);

module.exports = router;
