const {
  postWordData,
  postIncrementVisitsToWord
} = require("../controllers/activity.js");

module.exports = app => {
  app.get("/activity/word", postWordData);
  app.post("/activity/word", postIncrementVisitsToWord);
};
