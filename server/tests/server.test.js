const request = require("supertest")("http://localhost:8000");

it("should respond to a get request to /activity/word", done => {
  request
    .get("/activity/word")
    .expect(200)
    .end(done);
});
