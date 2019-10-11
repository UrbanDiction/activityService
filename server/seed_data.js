const faker = require("faker");

const mysql = require("./db/connection.js");

for (let i = 0; i < 100; i += 1) {
  const loremWord = faker.fake("{{lorem.word}}");
  mysql.connection.query(
    `INSERT INTO words (word) VALUES ('${loremWord}')`,
    (err, res) => {
      const defNum = Math.floor(Math.random() * 6);
      for (let z = 0; z < defNum; z += 1) {
        const wordId = res.insertId;
        const pastDate = faker.date.recent(365);
        const upVotes = faker.random.number({ min: 0, max: 15000 });
        const downVotes = faker.random.number({
          options: { min: 0, max: 7500 }
        });
        const name = faker.name.findName();
        const definition = faker.fake(
          "{{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}}"
        );
        mysql.connection.query(
          `INSERT INTO definitions (definition, created_date, created_by, upVotes, downVotes, word_id) VALUES ('${definition}', '${pastDate}', '${name}', ${upVotes}, ${downVotes}, ${wordId})`,
          () => {
            const pastDate2 = faker.date.recent(365);
            mysql.connection.query(
              `INSERT INTO visits (date, word_id) VALUES ('${pastDate2}', ${wordId})`
            );
          }
        );
      }
    }
  );
}
