const {
  postIncrementVisitsToWord,
  getVisitsForWord
} = require("../controllers/activity.js");

const { postWordData } = require("../controllers/definition.js");

module.exports = app => {
  app.get("/definition/word", postWordData);
  app.get("/activity/word", getVisitsForWord);
  app.post("/activity/word", postIncrementVisitsToWord);
};
