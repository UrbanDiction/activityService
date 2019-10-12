const api = require("../controllers/getApi.js");

module.exports = app => {
  app.post("/activity/word", api.getApi);
};
