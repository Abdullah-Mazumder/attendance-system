const { model, Schema } = require("mongoose");

const studentAttendanceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  adminAttendance: {
    type: Schema.Types.ObjectId,
    ref: "AdminAttendance",
  },
  createdAt: Date,
});

const StudentAttendance = model("StudentAttendance", studentAttendanceSchema);

module.exports = StudentAttendance;
