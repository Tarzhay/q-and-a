const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config()

const connection = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'sdc',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

connection.connect();

const getAll = (product_id, callback) => {
  const query = {
    text: `
      SELECT json_agg(ques) AS questions
      FROM (
        SELECT q.product_id, q.question_id, q.question, q.created_by, q.created_at,
          (SELECT json_agg(ans)
          FROM (
            SELECT * FROM answers WHERE question_id = q.question_id
          ) ans
      ) AS answers
      FROM questions AS q WHERE product_id = $1 ORDER BY question_id DESC) ques;
    `,
    values: [product_id],
  };

  connection.query(query, (error, response) => {
    if (error) {
      console.log('PostgreSQL error:', error);
    } else {
      callback(null, response);
    }
  });
};

const addQuestion = (product_id, questionObj, callback) => {
  const query = {
    text:
      'INSERT INTO questions (product_id, question, created_by) VALUES ($1, $2, $3) RETURNING *',
    values: [product_id, questionObj.question, questionObj.created_by],
  };

  connection.query(query, (error, response) => {
    if (error) {
      console.log('PostgreSQL error:', error);
    } else {
      callback(null, response);
    }
  });
};

const addAnswer = (question_id, answerObj, callback) => {
  const query = {
    text:
      'INSERT INTO answers (question_id, answer, created_by) VALUES ($1, $2, $3) RETURNING *',
    values: [question_id, answerObj.answer, answerObj.created_by],
  };

  connection.query(query, (error, response) => {
    if (error) {
      console.log('PostgreSQL error:', error);
    } else {
      callback(null, response);
    }
  });
};

const updateFlag = (
  product_id,
  question_id,
  answer_id,
  flag,
  callback,
) => {
  const query = {
    text:
      'UPDATE answers SET $1 = $1 + 1 WHERE product_id = $2, question_id = $3, answer_id = $4',
    values: [product_id, question_id, answer_id, flag],
  };

  connection.query(query, (error, response) => {
    if (err) {
      console.log('PostgreSQL error:', error);
    } else {
      callback(null, response);
    }
  });
};

module.exports = {
  getAll,
  addQuestion,
  addAnswer,
  updateFlag,
};
