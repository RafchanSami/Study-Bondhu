const express = require('express');
const router = express.Router();
const { saveDrawing, getDrawing } = require('../controllers/drawingController');

router.post('/', saveDrawing);
router.get('/:groupId', getDrawing);

module.exports = router;
