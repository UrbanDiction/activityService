const connection = require("../db/connection.js");

const queryIncrementDownvoteDefinition = ({ definitionId }, callback) => {
  connection.query(
    `UPDATE definitions SET downvotes = downvotes + 1 WHERE id = ${connection.escape(
      definitionId
    )}`,
    error1 => {
      if (error1) {
        callback(error1, null);
      }
      connection.query(
        `SELECT downvotes FROM definitions WHERE id = ${connection.escape(
          definitionId
        )}`,
        (error2, downvoteQuery) => {
          if (error2) {
            callback(error2, null);
          }
          callback(null, downvoteQuery);
        }
      );
    }
  );
};

module.exports = {
  queryIncrementDownvoteDefinition
};
