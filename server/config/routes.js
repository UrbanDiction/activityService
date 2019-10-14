const {
  postIncrementVisitsToWord,
  getVisitsForWord
} = require("../controllers/activity.js");

const {
  postWordData,
  putIncrementDownvoteDefinition,
  putIncrementUpvoteDefinition
} = require("../controllers/definition.js");

module.exports = app => {
  app.get("/definition/word", postWordData);
  app.put("/definition/downvote", putIncrementDownvoteDefinition);
  app.put("/definition/upvote", putIncrementUpvoteDefinition);
  app.get("/activity/word", getVisitsForWord);
  app.post("/activity/word", postIncrementVisitsToWord);
};
