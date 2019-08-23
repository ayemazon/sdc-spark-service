const QuestionsTenMil = require('../schema');
const mongoose = require('mongoose');
const faker = require('faker');

const db = mongoose.connection;

const seedTenMillion = async (smallBatch, bigBatch) => {
  let counter = 1;

  for (let i = 0; i <= smallBatch; i++) {
    let dataArray = [];

    for (let k = 0; k <= bigBatch; k++) {
      let fakeTenMil = {
        product: counter,
        questions: [
          {
            question_id: counter,
            question: faker.lorem.paragraph(),
            answers: [
              {
                user: faker.name.firstName(),
                answer: faker.lorem.sentence(),
                createdAt: new Date
              }
            ],
            votes: faker.random.number()
          }
        ]
      };
      dataArray.push(fakeTenMil);
      counter++;
    }
    console.log(`Finished seeding ${counter}`);
    await QuestionsTenMil.insertMany(dataArray);
  }
}

db.once('open', async () => {
  await seedTenMillion(1000, 10000);
  db.close( () => console.log('SUCCESS: Saved tenMil records'));
});