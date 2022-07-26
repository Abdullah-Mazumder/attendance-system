const router = require("express").Router();

const {
  getAttendance,
  getAttendanceStatus,
} = require("./../controllers/studentAttendanceController");

router.get("/status", getAttendanceStatus);
router.get("/:id", getAttendance);

module.exports = router;
