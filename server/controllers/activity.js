const { queryGetVisitsForWord } = require("../models/queryGetVisitsForWord.js");

module.exports = {
  getVisitsForWord(req, res) {
    queryGetVisitsForWord(req.body, (error, visits) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.json(visits);
      }
    });
  }
};
