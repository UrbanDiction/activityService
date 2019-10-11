const api = require("../controllers/getApi.js");

module.exports = app => {
  app.get("/activity/word", api.getApi);
};
