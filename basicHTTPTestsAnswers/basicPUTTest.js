import http from 'k6/http';
import { check } from 'k6';

export const options = {
    iterations: 1,
    vus: 1
};

export default function () {
  const payload = JSON.stringify({
    id: 1,
    title: 'Updated k6 post',
    body: 'This post was updated with k6.',
    userId: 1,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.put('https://jsonplaceholder.typicode.com/posts/1', payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'post title updated': (r) => r.json().title === 'Updated k6 post',
  });

  console.log(`PUT Response body: ${JSON.stringify(res.json(), null, 2)}`);
}