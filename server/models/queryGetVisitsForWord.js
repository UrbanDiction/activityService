const connection = require("../db/connection.js");

const queryGetVisitsForWord = ({ word }, callback) => {
  connection.query(
    `SELECT id FROM words where word = ${connection.escape(word)}`,
    (error1, wordQuery) => {
      if (error1) {
        callback(error1, null);
      } else {
        connection.query(
          `SELECT * FROM visits WHERE word_id = ${wordQuery[0].id}`,
          (error2, visitsQuery) => {
            if (error2) {
              callback(error2, null);
            }
            callback(null, { visitsQuery });
          }
        );
      }
    }
  );
};

module.exports = {
  queryGetVisitsForWord
};
