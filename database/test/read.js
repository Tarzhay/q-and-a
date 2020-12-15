import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';
import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

var errors = new Counter('errors');

export let options = {
  vus: 100,
  duration: '5s',
  // stages: [
  //   { duration: '2m', target: 100 }, // below normal load
  //   { duration: '5m', target: 100 },
  //   { duration: '2m', target: 200 }, // normal load
  //   { duration: '5m', target: 200 },
  //   { duration: '2m', target: 300 }, // around the breaking point
  //   { duration: '5m', target: 300 },
  //   { duration: '2m', target: 400 }, // beyond the breaking point
  //   { duration: '5m', target: 400 },
  //   { duration: '10m', target: 0 }, // scale down. Recovery stage.
  // ],
};

export default function () {
  const productId = faker.random.number({ min: 0, max: 9999999 });

  // READ
  let res = http.get(`http://100.25.221.255:3002/${productId}`);
  if (res.status !== 200) {
    errors.add(1);
  }
}
