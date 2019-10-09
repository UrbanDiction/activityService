const api = require("../controllers/getApi.js");

module.exports = app => {
  app.get("/api", api.getApi);
};
