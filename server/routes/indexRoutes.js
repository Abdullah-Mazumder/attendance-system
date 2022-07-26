const router = require("express").Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./usersRoutes");
const adminAttendanceRoutes = require("./adminAttendanceRoutes");
const studentAttendanceRoutes = require("./studentAttendanceRoutes");

const authenticate = require("../middlewares/authenticate");

router.use("/auth", authRoutes);
router.use("/users", authenticate, userRoutes);
router.use("/admin/attendance", authenticate, adminAttendanceRoutes);
router.use("/student/attendance", authenticate, studentAttendanceRoutes);

module.exports = router;
