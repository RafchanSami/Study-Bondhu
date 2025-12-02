const express = require('express');
const router = express.Router();
const Material = require('../models/Material');

router.post('/upload', async (req, res) => {
  const material = new Material(req.body);
  await material.save();
  res.json(material);
});

router.get('/:groupId', async (req, res) => {
  const materials = await Material.find({ groupId: req.params.groupId });
  res.json(materials);
});

module.exports = router;
