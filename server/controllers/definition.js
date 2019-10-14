const { queryWordData } = require("../models/queryWordData.js");

const {
  queryIncrementDownvoteDefinition
} = require("../models/queryIncrementDownvoteDefinition.js");

module.exports = {
  postWordData(req, res) {
    queryWordData(req.body, (error, wordData) => {
      if (error) {
        res.status(500).send(error);
      }
      res.json(wordData);
    });
  },
  putIncrementDownvoteDefinition(req, res) {
    queryIncrementDownvoteDefinition(req.body, (error, downvoteData) => {
      if (error) {
        res.status(500).send(error);
      }
      res.json({ downvoteData });
    });
  }
};
