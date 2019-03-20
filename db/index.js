var { Client } = require('pg');
var { database } = require('../config.js');
var client = new Client(database);
client.connect();

var getStarting = async (pet) => {
  var res = await client.query(`SELECT * FROM pets WHERE id = (SELECT MAX(id) FROM pets WHERE category = '${pet}');`);
  return res;
};

var getNext = async (id, pet) => {
  var res = await client.query(`SELECT * FROM pets WHERE id = (SELECT MAX(id) FROM pets WHERE id<${id} AND category = '${pet}');`);
  return res;
};

var postPet = async (category, image, description) => {
  var res = await client.query(`INSERT INTO pets (category, image, description, ratings) VALUES ('${category}', '${image}', '${description}', '{}')`);
  return res;
}

var updateRatings = async (id, rating) => {
  var newRatingsArr = await client.query(`SELECT array_append(ratings, ${rating}) FROM pets WHERE id = ${id}`);
  var res = await client.query(`UPDATE pets SET ratings = '{${newRatingsArr.rows[0].array_append}}' WHERE id = ${id} RETURNING id, image, description, ratings`);
  return res;
};

module.exports = {
  getStarting,
  getNext,
  postPet,
  updateRatings
}
