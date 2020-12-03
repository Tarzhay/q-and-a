DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc;

CREATE TABLE products (
  productId serial PRIMARY KEY,
  name varchar(200) NOT NULL,
  brand varchar(100) NOT NULL,
  price money DEFAULT 0.00,
  avgReview numeric DEFAULT 5.0,
  totalReviews smallint DEFAULT 0,
);

CREATE TABLE questions (
  questionId serial,
  productId serial REFERENCES products,
  question text NOT NULL,
  createdBy varchar(100) NOT NULL,
  createdAt date NOT NULL,
  PRIMARY KEY (questionId, productId)
);

CREATE TABLE answers (
  answerId serial,
  productId serial,
  questionId serial,
  answer text NOT NULL,
  createdBy varchar(100) NOT NULL,
  createdAt date NOT NULL,
  helpful smallint DEFAULT 0,
  notHelpful smallint DEFAULT 0,
  PRIMARY KEY (id, questionId),
  FOREIGN KEY (productId, questionId) REFERENCES questions
);