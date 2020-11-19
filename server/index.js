const express = require('express');
let app = express();
let db = require('../database/index.js');
var bodyParser = require('body-parser');
var path = require('path');
const port = 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());

app.get('/:id', (req, res) => {
  // console.log('I am here');
  // console.log(__dirname + '/../client/dist/index.html');
  var options = {
    root: path.join(__dirname, '/../client/dist')
  }
  res.sendFile('index.html', options);
})

//Retrieve Question and Answer information
app.get('/:id/api/Q_A', function (req, res) {
  //console.log(req);
  var productId = req.params.id;
  db.find(productId, (qa) => {
    console.log('I am here', qa.length);
    res.send(qa);
  });
});

app.post('/:id/api/Q_A/question', function (req, res) {
  //console.log(req);
  var productId = req.params.id;
  var queObj = req.body;
  console.log('queObj', queObj);
  db.saveQuestion({productId:productId, queObj:queObj}, (qa) => {
    console.log('I am here', qa.length);
    res.send(qa);
  });
});

app.post('/:id/api/Q_A/answer', function (req, res) {
  //console.log(req);
  var productId = req.params.id;
  var {questionId} = req.body;
  var {ansObj} = req.body;
  console.log('ansObj', req.body);
  db.saveAnswer({productId:productId, questionId:questionId, ansObj:ansObj}, (qa) => {
    console.log('I am here', qa.length);
    res.send(qa);
  });
});

app.post('/:id/api/Q_A/flag', function (req, res) {
  //console.log(req);
  var productId = req.params.id;
  var {questionId} = req.body;
  var {answerId} = req.body;
  var {flag} = req.body;
  console.log('ansObj', req.body);
  db.saveFlag({productId:productId, questionId:questionId, answerId:answerId, flag:flag}, (qa) => {
    console.log('I am here', qa.length);
    res.send(qa);
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});