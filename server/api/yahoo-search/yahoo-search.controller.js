'use strict';

var qs = require('querystring');
var request = require('request');

var oauth = {
  consumer_key: 'dj0yJmk9QVdvMjRlRks4bXF2JmQ9WVdrOWNqTXhTM2xzTjJjbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zNQ--',
  consumer_secret: '0a45199eb31266c92d58912f912d43f3a7bf6e24'
};


var url = 'https://yboss.yahooapis.com/ysearch/web';

function handleError(res, err) {
  return res.send(500, err);
}

exports.search = function(req, res) {

  var params = qs.stringify({
    q: req.param("q"),
    format: 'json',
    count: '10'
  });

  request.get({ url: url + '?' + params, oauth: oauth, json: true }, function(e, r, body) {
    if(e) {
      throw new Error(e);
    }
    res.send( r.body.bossresponse.web )
  });

};

