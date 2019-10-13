const { getBaseResponse } = require("../models/getAllData.js");

module.exports = {
  getApi(req, res) {
    getBaseResponse(req.body, (error, results) => {
      if (error) {
        res.status(500).send(error);
      }
      res.json(results);
    });
  }
};
