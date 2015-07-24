'use strict';

var oauth = {
  consumer_key: 'Keydj0yJmk9QVdvMjRlRks4bXF2JmQ9WVdrOWNqTXhTM2xzTjJjbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zNQ',
  consumer_secret: '0a45199eb31266c92d58912f912d43f3a7bf6e24'
};

function handleError(res, err) {
  return res.send(500, err);
}
