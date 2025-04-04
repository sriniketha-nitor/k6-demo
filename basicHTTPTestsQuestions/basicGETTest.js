import http from "k6/http";
import { check } from "k6";

export const options = {
    iterations: 1,
    vus: 1
};

// Write a default function to perform a GET request to "https://jsonplaceholder.typicode.com/posts"
// and use the `check` function to validate that the response status is 200
// and the response body is not empty.
