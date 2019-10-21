/* eslint-disable no-console */
const faker = require("faker");

const connection = require("./connection.js");

const wordsList = [];

function createWordNotInList() {
  let word = faker.fake("{{lorem.word}}");
  while (wordsList.includes(word)) {
    word = faker.fake("{{lorem.word}}");
  }
  wordsList.push(word);
  return word;
}

for (let i = 0; i < 100; i += 1) {
  const loremWord = createWordNotInList();
  connection.query(
    `INSERT INTO words (word) VALUES ('${loremWord}')`,
    (err, res) => {
      const defNum = Math.ceil(Math.random() * 8);
      for (let z = 0; z < defNum; z += 1) {
        const wordId = res.insertId;
        const pastDate = faker.date.recent(365).toISOString();
        const cut = pastDate.indexOf("T");
        const slicedDate = pastDate.slice(0, cut);
        const upVotes = faker.random.number({ min: 0, max: 15000 });
        const downVotes = faker.random.number({ min: 0, max: 7500 });
        const name = faker.name.findName();
        const definition = faker.fake(
          "{{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}}"
        );
        const example = faker.fake(
          "{{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}} {{lorem.word}}"
        );

        const hashTags = faker.fake(
          "{{lorem.word}} {{lorem.word}} {{lorem.word}}"
        );
        const visitsNum = Math.ceil(Math.random() * 200 + 50);
        connection.query(
          `INSERT INTO definitions (definition, example, hash_tags, created_date, created_by, upVotes, downVotes, word_id) VALUES ('${definition}', '${example}', '${hashTags}', '${slicedDate}', '${name}', ${upVotes}, ${downVotes}, ${wordId})`,
          () => {
            for (let x = 0; x < visitsNum; x += 1) {
              const pastDate2 = faker.date.recent(2550).toISOString();
              const cut2 = pastDate2.indexOf("T");
              let slicedDate2 = pastDate2.slice(0, cut2 - 2);
              slicedDate2 += "01";
              connection.query(
                `INSERT INTO visits (date, word_id) VALUES ('${slicedDate2}', ${wordId})`,
                () => {
                  console.clear();
                  // eslint-disable-next-line no-unused-expressions
                  i < 99
                    ? console.info("Added:", i + 1, "of 100.")
                    : console.info("Complete!\ncontrol+c to quit.");
                }
              );
            }
          }
        );
      }
    }
  );
}
