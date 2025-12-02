const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('../controllers/scheduleController');

router.post('/', createEvent);
router.get('/:groupId', getEvents);

module.exports = router;
