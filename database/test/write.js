import http from 'k6/http';
import { sleep } from 'k6';
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

export let options = {
  vus: 10,
  duration: '30s'
};

export default function () {
  let product_id = faker.random.number({ min: 0, max: 9999999});
  let url = `http://localhost:3001/api/${product_id}/questions/`;
  let headers = { 'Content-Type': 'application/json' };

  let questionObj = {
    product_id: product_id,
    question: `${faker.lorem.sentence().slice(0,-1)}?`,
    created_by: faker.internet.userName(),
  }

  http.post(url, JSON.stringify(question), { headers });
}