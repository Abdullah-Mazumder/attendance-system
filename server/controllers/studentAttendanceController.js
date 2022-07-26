const { addMinutes, isAfter } = require("date-fns");

const StudentAttendance = require("../models/StudentAttendance");
const AdminAttendance = require("../models/AdminAttendance");
const error = require("../utils/error");

const getAttendance = async (req, res, next) => {
  const id = req.params.id;
  try {
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) {
      throw error(
        "invalid attendance id or attendance system not running",
        400
      );
    }

    if (adminAttendance.status !== "RUNNING") {
      throw error("attendance system not running", 400);
    }

    let attendance = await StudentAttendance.findOne({
      adminAttendance: id,
      user: req.user._id,
    });

    if (attendance) {
      throw error("already attend", 400);
    }

    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: adminAttendance._id,
    });

    await attendance.save();
    return res.status(201).json(attendance);
  } catch (error) {
    next(error);
  }
};

const getAttendanceStatus = async (_req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });

    if (!running) {
      throw error("Not Running", 400);
    }

    const started = addMinutes(new Date(running.createdAt), running.timeLimit);

    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAttendance, getAttendanceStatus };
