const { getBaseResponse } = require("../models/getAllData.js");

module.exports = {
  getApi(req, res) {
    getBaseResponse(req.body, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(results);
    });
  }
};
