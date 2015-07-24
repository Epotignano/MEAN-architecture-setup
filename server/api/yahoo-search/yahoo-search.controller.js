'use strict';

var oauth = {
  consumer_key: 'Keydj0yJmk9QVdvMjRlRks4bXF2JmQ9WVdrOWNqTXhTM2xzTjJjbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zNQ',
  consumer_secret: '0a45199eb31266c92d58912f912d43f3a7bf6e24'
};


var url = 'https://yboss.yahooapis.com/ysearch/web';

function handleError(res, err) {
  return res.send(500, err);
}

exports.search = function(req, res) {

  var params = qs.stringify({
    q: req.param("keywords"),
    format: 'json',
    count: '10'
  });

  request.get({ url: url + '?' + params, oauth: oauth, json: true }, function(e, r, body) {
    console.log(JSON.parse(body).bossresponse.results);
    res.send( JSON.parse(body).bossresponse.results )

  });

};

