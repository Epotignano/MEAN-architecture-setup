var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var testModelSchema = new Schema({
	"title" : String,
	"description" : String
});

module.exports = mongoose.model('testModel', testModelSchema);
