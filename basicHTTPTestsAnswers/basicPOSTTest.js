import http from 'k6/http';
import { check } from 'k6';

export const options = {
    iterations: 1,
    vus: 1
};

export default function () {
  const payload = JSON.stringify({
    title: 'k6 test post',
    body: 'This post was created with k6.',
    userId: 1,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post('https://jsonplaceholder.typicode.com/posts', payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
    'post title matches': (r) => r.json().title === 'k6 test post',
  });

  console.log(`Post created with ID: ${res.json().id}`);
  console.log(`Response body: ${JSON.stringify(res.json(), null, 2)}`);
}