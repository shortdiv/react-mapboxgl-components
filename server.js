const express = require('express'),
      methodOverride = require('method-override');
      yelp = require('yelp-fusion'),
      port = 8000,
      app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/yelpit', (req, res) => {
  res.send('hello')
})
app.get('/yelpit/:term/:location', (req, res) => {
  const clientId = CLIENT_ID;
  const clientSecret = CLIENT_SECRET;
  yelp.accessToken(clientId, clientSecret)
    .then((response) => {
      const client = yelp.client(response.jsonBody.access_token);
      const searchRequest = {
        term: req.params.term,
        limit: 50,
        location: req.params.location
      }
      client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses;
        res.send(firstResult)
      })
    })
})

app.listen(port, 'localhost', function(err) {
  if(err) {console.log(err)}
  console.info(`Listening on port ${port}`)
});
