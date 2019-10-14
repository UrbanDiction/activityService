const {
  postIncrementVisitsToWord,
  getVisitsForWord
} = require("../controllers/activity.js");

const {
  postWordData,
  putIncrementDownvoteDefinition
} = require("../controllers/definition.js");

module.exports = app => {
  app.get("/definition/word", postWordData);
  app.put("/definition/downvote", putIncrementDownvoteDefinition);
  app.get("/activity/word", getVisitsForWord);
  app.post("/activity/word", postIncrementVisitsToWord);
};
