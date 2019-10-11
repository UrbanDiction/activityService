const connection = require("../db/connection.js");

const getBaseResponse = callback => {
  connection.query("SELECT word FROM words where id = 1", (error, results) => {
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
