const { queryGetVisitsForWord } = require("../models/queryGetVisitsForWord.js");
const {
  queryIncrementVisitsToWord
} = require("../models/queryIncrementVisitsToWord.js");

module.exports = {
  getVisitsForWord(req, res) {
    queryGetVisitsForWord(req.body, (error, visits) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(visits);
      }
    });
  },
  postIncrementVisitsToWord(req, res) {
    queryIncrementVisitsToWord(req.body, error => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.end();
      }
    });
  }
};
