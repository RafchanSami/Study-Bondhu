const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  subject: String,
  code: String,
  createdBy: String,
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
