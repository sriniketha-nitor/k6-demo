import http from 'k6/http';
import { check, group } from 'k6';

// Define thresholds in the options object
export const options = {
  iterations: 1,
  vus: 1,
  thresholds: {
    'http_req_duration{group:::Get Crocodiles List}': ['p(95)<300'], // 95% of requests in this group should complete below 300ms
    'http_req_duration{group:::Get Crocodile Details}': ['p(95)<400'], // 95% of requests in this group should complete below 400ms
    'http_req_duration{api:list}': ['p(95)<500'], // 95% of requests with the "api" tag should complete below 500ms
    'http_req_failed': ['rate<0.01'], // Less than 1% of requests should fail
  },
};

// Function to fetch the list of crocodiles
function getCrocodilesList() {
  const tags = { api: 'list' }; // Add a tag for this group

  // Send a GET request to fetch the list of crocodiles
  const response = http.get('https://test-api.k6.io/public/crocodiles/', { tags });

  // Perform checks to validate the response
  const isValidResponse = check(response, {
    'status is 200': (res) => res.status === 200,
    'response body is an array': (res) => Array.isArray(res.json()),
  });

  // Extract the ID of the first crocodile if the response is valid
  if (isValidResponse && response.json().length > 0) {
    const crocodileId = response.json()[0].id;
    console.log(`Extracted crocodile ID: ${crocodileId}`);
    return crocodileId;
  } else {
    console.warn('Failed to extract crocodile ID. Response might be invalid or empty.');
    return null;
  }
}

// Function to fetch details of a specific crocodile
function getCrocodileDetails(crocodileId) {
  const tags = { api: 'details' }; // Add a tag for this group

  if (crocodileId) {
    // Send a GET request to fetch details of the specific crocodile
    const response = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`, { tags });

    // Perform checks to validate the response
    check(response, {
      'status is 200': (res) => res.status === 200,
      'crocodile details match': (res) => res.json().id === crocodileId,
    });
  } else {
    console.warn('No crocodile ID available to fetch details.');
  }
}

// The default function that will be executed when the test runs
export default function () {
  let crocodileId = null;

  // Grouping the first set of requests for better organization and reporting
  group('Get Crocodiles List', () => {
    crocodileId = getCrocodilesList();
  });

  // Grouping the second set of requests for better organization and reporting
  group('Get Crocodile Details', () => {
    getCrocodileDetails(crocodileId);
  });
}
