const faker = require('faker');
const fs = require('fs');

const NUMBER_OF_PRODUCTS = 10;
//const NUMBER_OF_PRODUCTS = 10;
var NUMBER_OF_QUESTIONS = 55009698; // hard-coded here but can be set programmatically by running generateQuestionsCSV()
const PRODUCTS_CSV = 'products.csv';
const QUESTIONS_CSV = 'questions.csv';
const ANSWERS_CSV = 'answers2.csv';

const generateProductsCSV = () => {
  fs.writeFileSync(PRODUCTS_CSV, 'productId, name, brand, price, avgReview, totalReviews\n');

  for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) {
    let product = `${i},\
'${faker.commerce.product()}',\
'${faker.commerce.productAdjective()}',\
${faker.commerce.price()},\
${(Math.random() * 5).toFixed(2)},\
${Math.floor(Math.random() * 10) + 10}\n`;
    fs.appendFileSync(PRODUCTS_CSV, product, err => {
      if (err) {
        console.log('Error writing to file:', err);
      }
    });
  }
}

const generateQuestionsCSV = () => {
  fs.writeFileSync(QUESTIONS_CSV, 'questionId, productId, question, createdBy, createdAt\n');

  // questionId is universally unique
  let questionId = 0;

  for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) {

    // create 1-10 questions per product
    let numberOfQuestions = Math.floor(Math.random() * 10) + 1;
    for (let j = 0; j < numberOfQuestions; j++) {
      let question = `${questionId},\
${i},\
'${faker.lorem.sentence().slice(0,-1)}?',\
'${faker.internet.userName()}',\
'${new Date(faker.date.past()).toISOString()}'\n`;
      fs.appendFileSync(QUESTIONS_CSV, question, err => {
        if (err) {
          console.log('Error writing to file:', err);
        }
      });
      questionId++;
    }
  }
  NUMBER_OF_QUESTIONS = questionId;
}

const generateAnswersCSV = () => {
  fs.writeFileSync(ANSWERS_CSV, 'answerId, questionId, answer, createdBy, createdAt, helpful, notHelpful\n');

  // answerId is universally unique
  let answerId = 0;

  for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {

    // create 1-3 answers per question
    let numberOfAnswers = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < numberOfAnswers; j++) {
      let answer = `${answerId},\
${i},\
'${faker.lorem.paragraphs(Math.floor(Math.random() * 3) + 1)}',\
'${faker.internet.userName()}',\
'${new Date(faker.date.past()).toISOString()}',\
${Math.floor(Math.random() * 100) + 1},\
${Math.floor(Math.random() * 100) + 1}\n`;
/*
      let answer = `${answerId},\
${i},\
'${faker.lorem.sentence()}',\
'${faker.internet.userName()}',\
'${new Date(faker.date.past()).toISOString()}',\
${Math.floor(Math.random() * 100) + 1},\
${Math.floor(Math.random() * 100) + 1}\n`;
*/
      fs.appendFileSync(ANSWERS_CSV, answer, err => {
        if (err) {
          console.log('Error writing to file:', err);
        }
      });
      answerId++;
    }
  }
}

//generateProductsCSV();
//generateQuestionsCSV();
generateAnswersCSV();