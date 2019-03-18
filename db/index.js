var { Client } = require('pg');
var { database } = require('../config.js');
var client = new Client(database);
client.connect();

var getStarting = async (pet) => {
  var res = await client.query(`SELECT * FROM ${pet} WHERE id = (select MAX(id) from ${pet});`);
  return res;
};

var getNext = async (id, pet) => {
  var res = await client.query(`SELECT * FROM ${pet} WHERE id = (select MAX(id) from ${pet} where id<${id});`);
  return res;
};

// var getPrevious = async (id) => {
//   var res = await client.query(`SELECT * FROM dogs WHERE id > ${id} LIMIT 1;`);
//   return res;
// };

var updateRatings = async (id, data) => {

};

module.exports = {
  getStarting,
  getNext,
  updateRatings
}
