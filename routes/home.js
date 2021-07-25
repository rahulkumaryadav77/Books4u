const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/middleware');
const { homePage } = require('../controllers/index');

router.get('/', asyncErrorHandler(homePage));

module.exports = router;
