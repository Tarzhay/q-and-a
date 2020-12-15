const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const newrelic = require('newrelic');

const db = require('../database/pg/index.js');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));
app.use('/:id', express.static(__dirname + '/../client/dist'));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

app.get('/api/q-and-a/:id', function (req, res) {
  let product_id = req.params.id;
  db.getAll(product_id, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(results).end();
    }
  });
});

app.post('/api/q-and-a/:id/question', function (req, res) {
  let product_id = req.params.id;
  let questionObj = req.body;

  db.addQuestion(product_id, questionObj, (err, response) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(response).end();
    }
  });
});

app.post('/api/q-and-a/:id/answer', function (req, res) {
  let {
    question_id,
    answerObj
  } = req.body;

  db.addAnswer(question_id, answerObj, (err, response) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send(response).end();
    }
  });
});

app.post('/api/q-and-a/:id/flag', function (req, res) {
  let product_id = req.params.id;
  let {
    question_id,
    answer_id,
    flag
  } = req.body;

  db.updateFlag(
    product_id,
    question_id,
    answerId,
    flag,
    (err, response) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).send(response).end();
      }
    },
  );
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
