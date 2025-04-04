import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

// Load test data from a JSON file
const testData = new SharedArray('testData', function () {
    return JSON.parse(open('./data.json')); // Replace with the path to your JSON file
});

export const options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests should complete below 500ms
        'http_req_failed': ['rate<0.01'], // Less than 1% of requests should fail
    },
};

export default function () {
    // Pick a random data entry from the JSON file
    const randomData = testData[Math.floor(Math.random() * testData.length)];
    console.log(`Fetching the data of crocodile with ID: ${randomData.id}`);

    // Use the data in a GET request to fetch a specific crocodile
    const res = http.get(`https://test-api.k6.io/public/crocodiles/${randomData.id}`);

    // Validate the response
    check(res, {
        'is status 200': (r) => r.status === 200,
        'has crocodile name': (r) => JSON.parse(r.body).name !== undefined,
    });
}
