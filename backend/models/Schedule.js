const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  groupId: String,
  title: String,
  date: String,
  time: String,
  createdBy: String
});

module.exports = mongoose.model('Schedule', scheduleSchema);
