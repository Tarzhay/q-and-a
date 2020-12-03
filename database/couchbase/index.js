const ottoman = require('ottoman');

const connection = ottoman.connect({
  connectionString: 'couchbase://localhost',
  bucketName: 'q-and-a',
  username: 'duydnguyen',
  password: 'H97Lf!LrIuyM'
});

const Product = ottoman.model('Product', {
  productId: {
    type: String,
    auto: 'uuid',
    readonly: true
  },
  name: String,
  brand: String,
  price: Number,
  avgReview: Number,
  questions: [{
    questionId: Number,
    question: String,
    createdBy: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    answers: [{
      answerId: Number,
      answer: String,
      createdBy: String,
      createdAt: {
        type: Date,
        default: Date.now
      },
      helpful: Number,
      notHelpful: Number
    }]
  }]
});

const product  = new Product({
  name: 'Switch',
  brand: 'Nintendo',
  price: 299.99,
  avgReview: 5.0,
  questions: [{
    questionId: 1,
    question: 'How many controllers does it come with?',
    createdBy: 'dooz127',
    answers: [{
      answerId: 1,
      answer: '2 Joy-cons',
      createdBy: 'johndoe',
      helpful: 5,
      notHelpful: 0
    }]
  }]
});

const runAsync = async () => {
  try {
    await product.save();
    console.log(`success: product ${product.brand} ${product.name} added!`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

runAsync();