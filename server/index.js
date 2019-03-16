var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

var pets = require('../database-postgres/index.js');
// var routes = require('./routes.js');


var app = express();
app.use(express.static(__dirname + '/../react-client/dist'));

// app.use('/api', cors(), routes);
app.get('/api/dogs', cors(), async (req, res) => {
  var result = await pets.getStarting();
  res.send(result.rows[0]);
});

app.get('/api/dogs/:id', cors(), async (req, res) => {
  var { id } = req.params;
  var result = await pets.getNext(id);
  res.send(result.rows[0]);
});

app.put('/api/dogs/:id', async (req, res) => {
  var { id } = req.params;
  var data = req.body;
  var result = await Products.updateRatings(id, data);
  if (result === 0) {
    res.status(204).end();
  } else {
    res.status(200).end();
  }
});

app.post('/api/dogs', async (req, res) => {

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

