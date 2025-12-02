const express = require('express');
const router = express.Router();
const Group = require('../models/Group');

router.post('/create', async (req, res) => {
  const group = new Group(req.body);
  await group.save();
  res.json(group);
});

router.get('/all', async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

module.exports = router;
