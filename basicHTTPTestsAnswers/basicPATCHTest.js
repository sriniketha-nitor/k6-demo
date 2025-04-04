import http from 'k6/http';
import { check } from 'k6';

export const options = {
    iterations: 1,
    vus: 1
};

export default function () {
  const payload = JSON.stringify({
    title: 'Patched k6 post',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.patch('https://jsonplaceholder.typicode.com/posts/1', payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'post title patched': (r) => r.json().title === 'Patched k6 post',
  });

  console.log(`PATCH Response body: ${JSON.stringify(res.json(), null, 2)}`);
}