'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SuggestionsSchema = new Schema({
  key: String,
  info: String,
  active: Boolean
});

SuggestionsSchema.methods.findByKey = function (name, cb) {
 return this.model('Suggestions').find({ key: new RegExp(name, 'i')}, { '_id': 0, 'key':1} , cb);
};


module.exports = mongoose.model('Suggestions', SuggestionsSchema);
