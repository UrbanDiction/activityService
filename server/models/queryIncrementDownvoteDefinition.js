const connection = require("../db/connection.js");

const queryIncrementDownvoteDefinition = ({ definitionId }, callback) => {
  connection.query(
    `UPDATE definitions SET downvotes = downvotes + 1 WHERE id = ${connection.escape(
      definitionId
    )}`,
    // eslint-disable-next-line consistent-return
    error1 => {
      if (error1) {
        return callback(error1, null);
      }
      connection.query(
        `SELECT downvotes FROM definitions WHERE id = ${connection.escape(
          definitionId
        )}`,
        (error2, downvoteQuery) => {
          if (error2) {
            return callback(error2, null);
          }
          return callback(null, downvoteQuery);
        }
      );
    }
  );
};

module.exports = {
  queryIncrementDownvoteDefinition
};
