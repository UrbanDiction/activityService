const request = require("supertest")("http://localhost:8000");
const connection = require("../db/connection.js");

describe("Server tests", () => {
  beforeEach(done => {
    connection.query(`ALTER TABLE vists DROP FOREIGN KEY visits_ibfk_1`, () => {
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
                              `INSERT INTO visits(date, word_id) VALUES ('test date', 1)`,
                              () => {
                                connection.query(
                                  `INSERT INTO definitions(definition, word_id) VALUES ('test def', 1)`,
                                  () => {
                                    connection.query(
                                      `INSERT INTO words (word) VALUES('test')`,
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
    });
  });

  // afterEach(() => {
  //   connection.end();
  // });

  it("should respond to a POST request to /activity/word", done => {
    request
      .get("/activity/word")
      .send({ word: "test" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({
        definitionQuery: [
          {
            definition: "test def"
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
});
