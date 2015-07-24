'use strict';

var Suggestions = require('./suggestions.model');
var _ = require('lodash');
var yahooUrl = 'http://sugg.search.yahoo.net/sg/';

var request = require('request');
var qs = require('querystring');
var Q = require('q');

exports.retrieveSuggestions = function(req, res) {

  var promisesArray = [];

  // req.body.suggSource.yahoo
  if(req.param("yahoo")) {

    var yahooSearch = Q.defer();
    promisesArray.push(yahooSearch.promise);

    var params = qs.stringify({
      command: req.param("keyword"),
      output: 'json',
      results: '100'
    });

    request.get({ url: yahooUrl + '?' + params}, function(e, r, body) {

      console.log(yahooUrl + '?' + params);

      yahooSearch.resolve(JSON.parse(body).gossip.results);
    });

  }

  //req.body.suggSource.user

  if(req.param("userSugg")) {

    var userSuggestionsPromise = Q.defer();

    promisesArray.push(userSuggestionsPromise.promise);

    var suggestion = new Suggestions();

    suggestion.findByKey(req.param("keyword"), function(err, results) {
      userSuggestionsPromise.resolve(results);
    })
  }


  Q.all(promisesArray).done(function(results) {
    console.log(results);
    var _results = results[1].concat(results[0]);
    console.log(_results);
    res.json(_results);
  })

};


exports.create =  function(req, res) {

  console.log(req.body);
  var suggestion = new Suggestions({
    key : req.body.key
  });

  suggestion.save(function(err, createdSugg){
    if(err) {
      return res.json(500, {
        message: 'Error saving testModel',
        error: err
      });
    }
    return res.json({
      message: 'saved',
      _id: createdSugg._id
    });
  });
},



function handleError(res, err) {
  return res.send(500, err);
}
