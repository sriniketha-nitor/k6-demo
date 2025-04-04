import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

// Load test data from a JSON file

export const options = {
    // Define options which should include the number of virtual users, duration and thresholds
};

export default function () {
// Implement the test logic here
// need to fetch the crocodile ID from the JSON file and use it in a GET request to fetch the crocodile details
// use URL https://test-api.k6.io/public/crocodiles/ID
}
