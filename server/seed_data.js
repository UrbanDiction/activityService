const faker = require("faker");
const connection = require("./db/connection.js");

for (let i = 0; i < 100; i++) {
  const loremWord = faker.fake("{{lorem.word}}");
  connection.query(`INSERT INTO words (word) VALUES (${loremWord})`);
}
