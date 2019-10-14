const connection = require("../db/connection.js");

const queryWordData = ({ word }, callback) => {
  connection.query(
    `SELECT id FROM words where word = ${connection.escape(word)}`,
    (error1, wordQuery) => {
      if (error1) {
        return callback(error1, null);
      }
      if (!wordQuery[0]) {
        return callback("Word not found!", null);
      }
      connection.query(
        `SELECT * FROM definitions WHERE word_id = ${wordQuery[0].id}`,
        (error2, definitionQuery) => {
          if (error2) {
            return callback(error2, null);
          }
          connection.query(
            `SELECT date FROM visits WHERE word_id = ${wordQuery[0].id}`,
            (error3, visitsQuery) => {
              if (error3) {
                return callback(error3, null);
              }
              return callback(null, { definitionQuery, visitsQuery });
            }
          );
        }
      );
    }
  );
};

module.exports = {
  queryWordData
};
