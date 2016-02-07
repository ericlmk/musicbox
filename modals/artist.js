var Q = require('q');
var mongoose = require('mongoose');
var config = require('../util/config');

// Connect to MongoDB
mongoose.connect(config.get("mongodb").host);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var artistSchema = new Schema(
	{
		_id: {
			type: Number,
		},
		name: {
			type: String,
		},
		street: {
			type: String,
		},
		pobox: {
			type: String,
		},
		city: {
			type: String,
		},
		stateProvince: {
			type: String,
		},
		country: {
			type: String,
		},
		zip: {
			type: String,
		},
		email: {
			type: String,
		},
		instruments: {
			type: String,
		}
	}
);

artistSchema.statics.create = function(aArtist) {
	var deferred = Q.defer();
	var artist = new Artist(aArtist);
	artist.save( function(err, results){
		if (err) {
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(results);
		}
	});
	return deferred.promise;
}

artistSchema.statics.findById = function(aId) {
	var deferred = Q.defer();
	this.model('artist').findOne({_id: aId}, function(err, results){
		if (err) {
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(results);
		}
	});
	return deferred.promise;
}

artistSchema.statics.update = function(aArtist) {
	var deferred = Q.defer();

	//var updateSet = {};
	//updateSet["$set"] = artist;

	this.model('artist').findOneAndUpdate({_id: aArtist._id}, {$set: aArtist}, {new:true, upsert:false}, function(err, results){
		if (err) {
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(results);
		}
	});
	return deferred.promise;
}

artistSchema.statics.deleteById = function(aId) {
	var deferred = Q.defer();
	this.model('artist').findOne({_id: aId}).remove(function(err, results){
		if (err) {
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(JSON.parse(results));
		}
	});
	return deferred.promise;
}

artistSchema.statics.getMaxSeqNumber = function() {
	var deferred = Q.defer();
	this.findOne({}).select("_id").sort("-_id").exec(function(err, results) {
		if (err) {
			deferred.reject(new Error(err));
		} else {
			var maxSeqNumber = (!results || !results._id)?0:results._id;
			deferred.resolve(maxSeqNumber);
		}
	});
	return deferred.promise;
}

// Preset the _id if empty
artistSchema.pre('save', function(callback) {
	var doc = this;
	if (doc._id == null) {
		// By the max ID
		Artist.getMaxSeqNumber().then(function(value){
			doc._id = value+1;
			callback();
		}, function(err){
			console.log("Artist: Get Next ID: Fail: " + err);
		});
		// By seqnumbers collection
		/*
		seqnumber.getNext("artists").then(function(value){
			doc._id = value;
			callback();
		}, function(err){
			console.log("Fail: for get ID");
		})
		*/
	} else {
		callback();
	}
});

// Reference: mongoose will use name+"s" (e.g. artists) as collection
var Artist = mongoose.model('artist', artistSchema);

module.exports= Artist;
