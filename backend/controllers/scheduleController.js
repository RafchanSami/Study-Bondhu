const Schedule = require('../models/Schedule');

exports.createEvent = async (req, res) => {
  const event = new Schedule(req.body);
  await event.save();
  res.json(event);
};

exports.getEvents = async (req, res) => {
  const { groupId } = req.params;
  const events = await Schedule.find({ groupId });
  res.json(events);
};
