const connection = require("../db/connection.js");

const getBaseResponse = callback => {
  connection.query("SELECT * FROM words", (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getBaseResponse
};
