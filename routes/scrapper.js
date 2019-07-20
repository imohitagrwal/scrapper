var express = require('express');
var router = express.Router();

// Controllers
var Scrapper = require('../controller/scrapper');

// Routes

router.post("/" , Scrapper.scrapMetaData);

module.exports = router;