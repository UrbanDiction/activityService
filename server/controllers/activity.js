const { queryWordData } = require("../models/queryWordData.js");
const {
  queryIncrementVisitsToWord
} = require("../models/queryIncrementVisitsToWord.js");

module.exports = {
  postWordData(req, res) {
    queryWordData(req.body, (error, results) => {
      if (error) {
        res.status(500).send(error);
      }
      res.json(results);
    });
  },
  postIncrementVisitsToWord(req, res) {
    queryIncrementVisitsToWord(req.body, error => {
      if (error) {
        res.status(500).send(error);
      }
      res.end();
    });
  }
};
