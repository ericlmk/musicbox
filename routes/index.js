var express = require('express');
var Q = require('q');
var artist = require('../modals/artist');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	// Prep artist list
	artist.find({}).then(function(results){
		res.render('index', {
			title: 'Music Box',
			artists: results
		});
	}, function(err){

	});

});

module.exports = router;
