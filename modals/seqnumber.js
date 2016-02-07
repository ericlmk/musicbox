var mongoose = require('mongoose');
var Q = require('q');
var config = require('../util/config');

// Connect to MongoDB
mongoose.connect(config.get("mongodb").host);

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var SeqNumberSchema = Schema({
    _id: { type: String, required: true },
    value: { type: Number, default: 0 }
});

SeqNumberSchema.statics.getNext = function(collectionName) {
	var deferred = Q.defer();
	SeqNumber.findByIdAndUpdate({_id: collectionName}, {$inc: {value: 1}}, {new: true, upsert: true}, function(err, results) {
		if (err) {
			deferred.reject(new Error(err));
		} else {
			deferred.resolve(results.value);
		}
	});
	return deferred.promise;
}

var SeqNumber = mongoose.model('seqnumber', SeqNumberSchema);

module.exports= SeqNumber;
