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
  app.post("/definition/word", postWordData);
  app.put("/definition/downvote", putIncrementDownvoteDefinition);
  app.put("/definition/upvote", putIncrementUpvoteDefinition);
  app.post("/activity/word/getVisits", getVisitsForWord);
  app.post("/activity/word/incrementVisit", postIncrementVisitsToWord);
  app.get("/:word", (req, res) => {
    res.send(`<!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  <link href="c3.min.css" rel="stylesheet" />
                  <title>UrbanDiction</title>
                </head>

                <body>
                  <div id="activityApp">
                    Waiting to load react...
                  </div>
                  <script src="https://d3js.org/d3.v5.min.js"></script>
                  <script src="c3.min.js"></script>
                  <script type="text/javascript" src="bundle.js"></script>
                </body>
              </html>
`);
  });
};
