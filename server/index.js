var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');

var pets = require('../db/index.js');
// var routes = require('./routes.js');


var app = express();
app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

// app.use('/api', cors(), routes);
app.get('/api/dogs', cors(), async (req, res) => {
  var result = await pets.getStarting('dogs');
  res.send(result.rows[0]);
});

app.get('/api/cats', cors(), async (req, res) => {
  var result = await pets.getStarting('cats');
  res.send(result.rows[0]);
});

app.get('/api/others', cors(), async (req, res) => {
  var result = await pets.getStarting('others');
  res.send(result.rows[0]);
});

app.get('/api/dogs/:id', cors(), async (req, res) => {
  var { id } = req.params;
  var result = await pets.getNext(id, 'dogs');
  if (result.rows[0]) {
    res.send(result.rows[0]);
  } else {
    res.send('null');
  }
});

app.get('/api/cats/:id', cors(), async (req, res) => {
  var { id } = req.params;
  var result = await pets.getNext(id, 'cats');
  if (result.rows[0]) {
    res.send(result.rows[0]);
  } else {
    res.send('null');
  }
});

app.get('/api/others/:id', cors(), async (req, res) => {
  var { id } = req.params;
  var result = await pets.getNext(id, 'others');
  if (result.rows[0]) {
    res.send(result.rows[0]);
  } else {
    res.send('null');
  }
});

app.post('/api/postPet', async (req, res) => {
  var { category, image, description } = req.body;
  var result = await pets.postPet(category, image, description);
  if (result) {
    res.send(result);
  } else {
    res.send('null')
  }
});

app.put('/api/pets/:id', async (req, res) => {
  var { id } = req.params;
  var data = req.body;
  var result = await pets.updateRatings(id, data.newRating);
  res.send(result.rows[0]);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

