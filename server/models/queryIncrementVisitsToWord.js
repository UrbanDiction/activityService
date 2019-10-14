const connection = require("../db/connection.js");

const queryIncrementVisitsToWord = ({ word }, callback) => {
  connection.query(
    `SELECT id FROM words where word = ${connection.escape(word)}`,
    // eslint-disable-next-line consistent-return
    (error, wordQuery) => {
      if (error) {
        return callback(error, null);
      }
      const date = new Date();
      connection.query(
        `INSERT INTO visits (date, word_id) VALUES ('${date}', ${wordQuery[0].id})`,
        (error2, visit) => {
          if (error2) {
            return callback(error2, null);
          }
          return callback(null, visit);
        }
      );
    }
  );
};

module.exports = {
  queryIncrementVisitsToWord
};
