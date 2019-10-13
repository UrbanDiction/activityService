const request = require("supertest")("http://localhost:8000");

it("should respond to a POST request to /activity/word", done => {
  request
    .post("/activity/word")
    .send({ word: "soluta" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect({
      definitionQuery: [
        {
          definition:
            "illum nihil molestiae dignissimos saepe praesentium dolore omnis velit labore dolorem ut iure ut et est laboriosam non molestiae eos"
        },
        {
          definition:
            "rem qui id amet sed atque inventore molestiae aut laborum veniam illo voluptate aut quis ea fugit qui tenetur voluptates"
        },
        {
          definition:
            "recusandae iure suscipit aliquid libero quos quasi ipsum vitae at quaerat qui assumenda voluptas voluptatem id consequatur et in ad"
        }
      ],
      visitsQuery: [
        {
          date: "Sun Jun 23 2019 17:52:44 GMT-0700 (Mountain Standard Time)"
        },
        {
          date: "Thu Aug 08 2019 13:50:13 GMT-0700 (Mountain Standard Time)"
        },
        {
          date: "Sat Dec 01 2018 20:31:30 GMT-0700 (Mountain Standard Time)"
        }
      ]
    })
    .expect(200)
    // eslint-disable-next-line consistent-return
    .end(err => {
      if (err) {
        return done(err);
      }
      done();
    });
});
