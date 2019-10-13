const connection = require("../db/connection.js");

const queryWordData = ({ word }, callback) => {
  connection.query(
    `SELECT id FROM words where word = ${connection.escape(word)}`,
    (error1, wordQuery) => {
      if (error1) {
        callback(error1, null);
      } else {
        connection.query(
          `SELECT * FROM definitions WHERE word_id = ${wordQuery[0].id}`,
          (error2, definitionQuery) => {
            if (error2) {
              callback(error2, null);
            }
            connection.query(
              `SELECT date FROM visits WHERE word_id = ${wordQuery[0].id}`,
              (error3, visitsQuery) => {
                if (error3) {
                  callback(error3, null);
                }
                callback(null, { definitionQuery, visitsQuery });
              }
            );
          }
        );
      }
    }
  );
};

module.exports = {
  queryWordData
};
