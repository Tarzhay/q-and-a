const faker = require('faker');
const fs = require('fs');

//const NUMBER_OF_PRODUCTS = 10000000;
const NUMBER_OF_PRODUCTS = 10;
const PRODUCTS_JSON = 'products3.json';

const generateProductsJSON = () => {
  fs.writeFileSync(PRODUCTS_JSON, '[');

  let questionId = 0;
  let answerId = 0;

  for (let i = 10000000; i < 10000000 + NUMBER_OF_PRODUCTS; i++) {
    let product = {
      productId: i,
      name: faker.commerce.product(),
      brand: faker.commerce.productAdjective(),
      price: faker.commerce.price(),
      avgReview: (Math.random() * 5).toFixed(2),
      totalReviews: Math.floor(Math.random() * 10) + 10
    };

    // create 1-10 questions per product
    let questions = [];
    let numberOfQuestions = Math.floor(Math.random() * 10) + 1;
    for (let j = 0; j < numberOfQuestions; j++) {
      let question = {
        questionId: questionId,
        productId: i,
        question: `${faker.lorem.sentence().slice(0,-1)}?`,
        createdBy: faker.internet.userName(),
        createdAt: new Date(faker.date.past()).toISOString(),
      };

      // create 1-3 answers per question
      let answers = [];
      let numberOfAnswers = Math.floor(Math.random() * 2) + 1;
      for (let k = 0; k < numberOfAnswers; k++) {
        let answer = {
            answerId: answerId,
            questionId: questionId,
            answer: faker.lorem.paragraphs(Math.floor(Math.random() * 2) + 1),
            createdBy: faker.internet.userName(),
            createdAt: new Date(faker.date.past()).toISOString(),
            helpful: Math.floor(Math.random() * 100) + 1,
            notHelpful: Math.floor(Math.random() * 100) + 1
          };
        // let answer = {
        //   answerId: answerId,
        //   questionId: questionId,
        //   answer: faker.lorem.sentence(),
        //   createdBy: faker.internet.userName(),
        //   createdAt: new Date(faker.date.past()).toISOString(),
        //   helpful: Math.floor(Math.random() * 100) + 1,
        //   notHelpful: Math.floor(Math.random() * 100) + 1
        // };

        answers.push(answer);
        answerId++;
      }

      question['answers'] = answers;
      questions.push(question);
      questionId++;
    }

    product['questions'] = questions;

    fs.appendFileSync(PRODUCTS_JSON, `${JSON.stringify(product)}${i < 1000000 + NUMBER_OF_PRODUCTS - 1 ? ',' : ']'}\n`, err => {
      if (err) {
        console.log('Error writing to file:', err);
      }
    });
  }
}

generateProductsJSON();