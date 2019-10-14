const request = require("supertest")("http://localhost:8000");
const connection = require("../db/connection.js");

describe("Server tests", () => {
  beforeEach(done => {
    connection.query(
      `ALTER TABLE visits DROP FOREIGN KEY visits_ibfk_1`,
      () => {
        connection.query(
          `ALTER TABLE definitions DROP FOREIGN KEY definitions_ibfk_1`,
          () => {
            connection.query(`ALTER TABLE visits DROP word_id`, () => {
              connection.query(`ALTER TABLE definitions DROP word_id`, () => {
                connection.query(`TRUNCATE visits`, () => {
                  connection.query(`TRUNCATE definitions`, () => {
                    connection.query(`TRUNCATE words`, () => {
                      connection.query(
                        `ALTER TABLE visits ADD word_id INTEGER, ADD CONSTRAINT FOREIGN KEY(word_id) REFERENCES words(id)`,
                        () => {
                          connection.query(
                            `ALTER TABLE definitions ADD word_id INTEGER, ADD CONSTRAINT FOREIGN KEY(word_id) REFERENCES words(id)`,
                            () => {
                              connection.query(
                                `INSERT INTO words(word) VALUES ('test')`,
                                () => {
                                  connection.query(
                                    `INSERT INTO definitions(definition, created_date, created_by, upvotes, downvotes, word_id) VALUES ('test def', "2017-08-02", "Nick", 1, 1, 1)`,
                                    () => {
                                      connection.query(
                                        `INSERT INTO visits(date, word_id) VALUES('test date', 1)`,
                                        done
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    });
                  });
                });
              });
            });
          }
        );
      }
    );
  });

  // afterEach(() => {
  //   connection.end();
  // });

  it("should respond to a get request to /definition/word with all data", done => {
    request
      .get("/definition/word")
      .send({ word: "test" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({
        definitionQuery: [
          {
            id: 1,
            definition: "test def",
            created_date: "2017-08-02",
            created_by: "Nick",
            upvotes: 1,
            downvotes: 1,
            word_id: 1
          }
        ],
        visitsQuery: [
          {
            date: "test date"
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

  it("should increment downvotes when put to /definition/downvote", done => {
    request
      .put("/definition/downvote")
      .send({ definitionId: 1 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({
        downvoteData: [
          {
            downvotes: 2
          }
        ]
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("should increment upvotes when put to /definition/upvote", done => {
    request
      .put("/definition/upvote")
      .send({ definitionId: 1 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({
        upvoteData: [
          {
            upvotes: 2
          }
        ]
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("should respond with visits data to word when get to /activity/word", done => {
    request
      .get("/activity/word")
      .send({ word: "test" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ visitsQuery: [{ id: 1, date: "test date", word_id: 1 }] })
      .end(err => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  it("should add a visit to a word when post to /activity/word", done => {
    request
      .post("/activity/word")
      .send({ word: "test" })
      // eslint-disable-next-line consistent-return
      .end(err => {
        if (err) {
          return done(err);
        }
        connection.query(
          `SELECT date FROM visits WHERE word_id = 1`,
          // eslint-disable-next-line consistent-return
          (error, visits) => {
            if (error) {
              return done(err);
            }
            expect(visits.length).toEqual(2);
            done();
          }
        );
      });
  });
});
