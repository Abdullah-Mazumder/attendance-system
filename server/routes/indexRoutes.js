const router = require("express").Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./usersRoutes");

const authenticate = require("../middlewares/authenticate");

router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);

module.exports = router;
