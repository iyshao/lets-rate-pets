var express = require('express');
var Pets = require('../database-postgres/index.js');
var router = express.Router();

router.get('', async (req, res) => {
  var result = await Pets.getStarting();
  res.send(result.rows[0]);
});