var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var testModelSchema = new Schema({

module.exports = mongoose.model('testModel', testModelSchema);