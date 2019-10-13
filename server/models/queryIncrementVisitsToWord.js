const connection = require("../db/connection.js");

const queryIncrementVisitsToWord = ({ word }, callback) => {
  connection.query(
    `SELECT id FROM words where word = ${connection.escape(word)}`,
    (error, wordQuery) => {
      if (error) {
        callback(error, null);
      }
      const date = new Date();
      connection.query(
        `INSERT INTO visits (date, word_id) VALUES ('${date}', ${wordQuery[0].id})`,
        (error2, visit) => {
          if (error2) {
            callback(error2, null);
          }
          callback(null, visit);
        }
      );
    }
  );
};

module.exports = {
  queryIncrementVisitsToWord
};
