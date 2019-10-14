const connection = require("../db/connection.js");

const queryIncrementUpvoteDefinition = ({ definitionId }, callback) => {
  connection.query(
    `UPDATE definitions SET upvotes = upvotes + 1 WHERE id = ${connection.escape(
      definitionId
    )}`,
    error1 => {
      if (error1) {
        return callback(error1, null);
      }
      connection.query(
        `SELECT upvotes FROM definitions WHERE id = ${connection.escape(
          definitionId
        )}`,
        (error2, upvoteQuery) => {
          if (error2) {
            return callback(error2, null);
          }
          return callback(null, upvoteQuery);
        }
      );
    }
  );
};

module.exports = {
  queryIncrementUpvoteDefinition
};
