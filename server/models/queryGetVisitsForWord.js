const connection = require("../db/connection.js");

const queryGetVisitsForWord = ({ word }, callback) => {
  connection.query(
    `SELECT id FROM words where word = ${connection.escape(word)}`,
    // eslint-disable-next-line consistent-return
    (error1, wordQuery) => {
      if (error1) {
        return callback(error1, null);
      }
      if (!wordQuery[0]) {
        return callback("Word not found!", null);
      }
      connection.query(
        `SELECT * FROM visits WHERE word_id = ${wordQuery[0].id}`,
        (error2, visitsQuery) => {
          if (error2) {
            return callback(error2, null);
          }
          return callback(null, { visitsQuery });
        }
      );
    }
  );
};

module.exports = {
  queryGetVisitsForWord
};
