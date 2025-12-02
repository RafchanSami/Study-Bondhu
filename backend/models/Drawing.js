const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
  groupId: String,
  strokes: Array,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Drawing', drawingSchema);
