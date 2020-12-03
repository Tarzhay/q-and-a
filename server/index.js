const express = require('express');
let app = express();
let db = require('../database/index.js');
var bodyParser = require('body-parser');
var path = require('path');
const port = 3001;

//app.use('/', express.static(__dirname + '/../client/dist'));
// app.use(express.static(__dirname + '/../client/dist'));
// app.use('/', express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/../client/dist'));
app.use('/:id', express.static(__dirname + '/../client/dist'));


app.get('/:id', (req, res) => { res.sendFile(path.join(__dirname + '/../client/dist/index.html')); })


// app.get('/api/:id/file', (req, res) => {
//   console.log('I am here');
//   console.log(__dirname + '/../client/dist/index.html');
//   var options = {
//     root: path.join(__dirname, '/../client/dist')
//   }
//   var pathdir =path.join(__dirname, '/../client/dist/index.html')
//   res.sendFile(pathdir);
// })


//Retrieve Question and Answer information
app.get('/api/:id/q-and-a', function (req, res) {
  var productId = req.params.id;
  var {sortby}= req.query;
  db.find({productId: productId, sortby:sortby}, (qa) => {
    res.send(qa[0]);
  });
});

app.post('/api/:id/questions', function (req, res) {
  var productId = req.params.id;
  var queObj = req.body;
  db.saveQuestion({productId:productId, queObj:queObj}, (qa) => {
    res.send(qa);
  });
});

app.post('/api/:id/answers', function (req, res) {
  var productId = req.params.id;
  var {questionId} = req.body;
  var {ansObj} = req.body;
  db.saveAnswer({productId:productId, questionId:questionId, ansObj:ansObj}, (qa) => {
    res.send(qa);
  });
});

app.post('/api/:id/flag', function (req, res) {
  var productId = req.params.id;
  var {questionId} = req.body;
  var {answerId} = req.body;
  var {flag} = req.body;
  db.saveFlag({productId:productId, questionId:questionId, answerId:answerId, flag:flag}, (qa) => {
    res.send(qa);
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});