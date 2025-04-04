import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.del('https://jsonplaceholder.typicode.com/posts/1');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  console.log(`Delete Response body: ${JSON.stringify(res.json(), null, 2)}`);
}