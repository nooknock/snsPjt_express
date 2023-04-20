var express = require('express');
const path = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'hi23' });

  res.sendFile(path.join(__dirname,'/hello.html'))
});

module.exports = router;

