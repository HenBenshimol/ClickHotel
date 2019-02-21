var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Click Hotel' });
});

/* GET General Information page. */
router.get('/GeneralInformation', function(req, res) {
  res.render('GeneralInformation', { title: 'General Information', Hotel: 'Hilton' });
});


module.exports = router;
