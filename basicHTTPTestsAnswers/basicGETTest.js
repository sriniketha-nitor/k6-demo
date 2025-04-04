import http from "k6/http";
import { check } from "k6";

export const options = {
    iterations: 1,
    vus: 1
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response body is an array': (r) => Array.isArray(r.json()),
  });

}