const { getBaseResponse } = require("../models/getAllData.js");

module.exports = {
  getApi(req, res) {
    getBaseResponse((err, results) => {
      res.status(200).json(results);
    });
  }
};
