const Drawing = require('../models/Drawing');

exports.saveDrawing = async (req, res) => {
  const { groupId, strokes } = req.body;
  const drawing = await Drawing.findOneAndUpdate(
    { groupId },
    { strokes, updatedAt: Date.now() },
    { upsert: true, new: true }
  );
  res.json(drawing);
};

exports.getDrawing = async (req, res) => {
  const { groupId } = req.params;
  const drawing = await Drawing.findOne({ groupId });
  res.json(drawing);
};
