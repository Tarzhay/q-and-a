const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/FEC', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var qaSchema = new mongoose.Schema({
  _id: 'number',
  productId: 'number',
  questions: [{
    _id: 'number',
    questionId: 'number',
    question: "string",
    createdBy: "string",
    createdAt: "date",
    answers: [
      {
        _id: 'number',
        answerId: "number",
        answer: "string",
        createBy: "string",
        createAt: "date",
        helpful: "number",
        notHelpful: "number"
      }
    ]
  }
]
});

const QaModel = mongoose.model('QaModel', qaSchema);


//retrieve data for a specific product_id
let find = (productId, callback) => {

  var query =QaModel.find({"productId":productId},(err, data) => {
    if(err) {
      console.log(err);
    } else {
      //console.log(JSON.stringify(data));
      callback(data);
    }
  });

  //.sort({watchersCount:-1}).limit(25);
}

//retrieve data for a specific product_id
let saveQuestion = (productId, callback) => {

  var query =QaModel.find({"productId":productId},(err, data) => {
    if(err) {
      console.log(err);
    } else {
      //console.log(JSON.stringify(data));
      callback(data);
    }
  });

  //.sort({watchersCount:-1}).limit(25);
}

//retrieve data for a specific product_id
let saveAnswer = (productId, callback) => {

  var query =QaModel.find({"productId":productId},(err, data) => {
    if(err) {
      console.log(err);
    } else {
      //console.log(JSON.stringify(data));
      callback(data);
    }
  });

  //.sort({watchersCount:-1}).limit(25);
}

module.exports = { find: find , saveAnswer: saveAnswer, saveQuestion: saveQuestion};