const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  groupId: String,
  title: String,
  link: String,
  uploadedBy: String,
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
