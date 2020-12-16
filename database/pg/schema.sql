DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc;

CREATE TABLE products (
  product_id serial PRIMARY KEY,
  name varchar(200) NOT NULL,
  brand varchar(100) NOT NULL,
  price money DEFAULT 0.00,
  avg_review numeric DEFAULT 5.0,
  total_reviews smallint DEFAULT 0
);

CREATE TABLE questions (
  question_id serial PRIMARY KEY,
  product_id integer REFERENCES products (product_id),
  question text NOT NULL,
  created_by varchar(100) NOT NULL,
  created_at date DEFAULT now()
);

CREATE TABLE answers (
  answer_id serial PRIMARY KEY,
  question_id integer REFERENCES questions (question_id),
  answer text NOT NULL,
  created_by varchar(100) NOT NULL,
  created_at date DEFAULT now(),
  helpful smallint DEFAULT 0,
  not_helpful smallint DEFAULT 0
);

COPY products(product_id, name, brand, price, avg_review, total_reviews)
FROM '~/q-and-a/database/pg/products.csv'
DELIMITER ','
CSV HEADER;

COPY questions(question_id, product_id, question, created_by, created_at)
FROM '~/q-and-a/database/pg/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(answer_id, question_id, answer, created_by, created_at, helpful, not_helpful)
FROM '~/q-and-a/database/pg/answers.csv'
DELIMITER ','
CSV HEADER;