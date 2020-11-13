const express = require('express');
let app = express();
let db = require('../database/index.js');
var bodyParser = require('body-parser');
const port = 3000;

//app.use(express.static(__dirname + '/../client/dist'));

//app.use(bodyParser.json());

//Retrieve Question and Answer information
app.get('/api/:id/Q_A', function (req, res) {
  //console.log(req);
  var productId = req.params.id;
  db.find(productId, (qa) => {
    console.log('I am here', qa.length);
    res.send(qa);
  });
});


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});