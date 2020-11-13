const mongoose = require('mongoose');
const {sampleQAData} = require('./sample_data.js');

mongoose.connect('mongodb://localhost/FEC', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('DB Connected');
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


const seed = () => {
  // Product.insertMany()
  QaModel.insertMany(sampleQAData, (err, product) => {
    if (err) return console.log(err)
    else {
      console.log('sampleQAData saved successfully');
      mongoose.connection.close();
    }
  });
}

mongoose.connect('mongodb://localhost/FEC', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));
  QaModel.deleteMany({})
  .then(() =>{
    console.log('Data Deleted');
    seed();
  });