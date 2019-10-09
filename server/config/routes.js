const api = require("../controllers/getApi.js");

module.exports = function(app) {
  app.get("/api", api.getApi);
};
