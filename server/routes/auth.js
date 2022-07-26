const router = require("express").Router();

const {
  registerPostController,
  loginPostController,
} = require("./../controllers/auth");

router.post("/register", registerPostController);

router.post("/login", loginPostController);

module.exports = router;
