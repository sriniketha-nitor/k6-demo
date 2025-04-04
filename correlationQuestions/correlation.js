// Implement the program, by follow these steps:

// 2. **Import necessary K6 modules**:
//   - Import `http` for making HTTP requests.
//   - Import `check` and `group` for validation and grouping requests.

// 3. **Define test options**:
//   - Set the number of iterations and virtual users (VUs).
//   - Define thresholds for response times and failure rates.

// 4. **Implement the function to fetch the list of crocodiles from https://test-api.k6.io/public/crocodiles/**:
//   - Use `http.get` to send a GET request to the crocodile list endpoint.
//   - Add tags for the request.
//   - Validate the response using `check`.
//   - Extract and return the ID of the first crocodile if the response is valid.

// 5. **Implement the function to fetch details of a specific crocodile using https://test-api.k6.io/public/crocodiles/id**:
//   - Use `http.get` to send a GET request to the crocodile details endpoint.
//   - Add tags for the request.
//   - Validate the response using `check`.

// 6. **Organize requests into groups**:
//   - Use `group` to organize the requests for fetching the crocodile list and details.

// 7. **Write the default function**:
//   - Call the functions for fetching the crocodile list and details within their respective groups.

// 8. **Run the test**:
//   - Execute the script using the `k6 run` command.

// Let me know if you need help with any specific step!
