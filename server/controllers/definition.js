const { queryWordData } = require("../models/queryWordData.js");

module.exports = {
  postWordData(req, res) {
    queryWordData(req.body, (error, results) => {
      if (error) {
        res.status(500).send(error);
      }
      res.json(results);
    });
  }
};
