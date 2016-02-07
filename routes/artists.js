var express = require('express');
var artist = require('../modals/artist');

var router = express.Router();


function prepResponse(res, result){
	res.json({
		result: result
	})
}

var route = router.route('/:id');

// CRUD: Create
route.post(function(req, res) {
	var artistId = req.params.id;
	var newArtist = req.body;
	if (!artistId || artistId>0) {
		newArtist._id = artistId;
	}
	artist.create(newArtist).then(
		function(results){
			prepResponse(res, results);
		},
		function(err){
			prepResponse(res, {});
		}
	);
});

// CRUD: Read
route.get(function(req, res) {
	var artistId = req.params.id;
	artist.findById(artistId).then(
		function(results){
			prepResponse(res, results);
		},
		function(err){
			prepResponse(res, {});
		}
	);
});

// CRUD: Update
route.put(function(req, res) {
	var artistId = req.params.id;
	var updateArtist = req.body;
	updateArtist._id = artistId;
	artist.update(updateArtist).then(
		function(results){
			prepResponse(res, results);
		},
		function(err){
			prepResponse(res, false);
		}
	);
});

// CRUD: Delete
route.delete(function(req, res) {
	var artistId = req.params.id;
	artist.deleteById(artistId).then(
		function(results){
			prepResponse(res, (results.n==1));
		},
		function(err){
			prepResponse(res, false);
		}
	);
});


// Advanced: Search
router.route('/search/:key/:query').get(function(req, res) {
	var paramKey = req.params.key;
	var paramQuery = req.params.query;
	var criteria = {};
	criteria[paramKey] = new RegExp(paramQuery, "i");
	artist.find(criteria).then(
		function(results){
			prepResponse(res, results);
		},
		function(err){
			prepResponse(res, {});
		}
	);
});


module.exports = router;
