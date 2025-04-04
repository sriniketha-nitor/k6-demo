import http from 'k6/http';
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';
import { sleep } from 'k6';

// Custom metrics
const myCounter = new Counter('my_counter');
const myGauge = new Gauge('my_gauge');
const myRate = new Rate('my_rate');
const myTrend = new Trend('my_trend');

export const options = {
    vus: 10, // Number of virtual users
    duration: '30s', // Test duration
};

export default function () {
    const url = 'https://test-api.k6.io/public/crocodiles/';
    const res = http.get(url);

    // Custom metric tracking
    myCounter.add(1); // Increment counter
    myGauge.add(res.timings.duration); // Record response time
    myRate.add(res.status === 200); // Track success rate
    myTrend.add(res.timings.duration); // Track response time trend

    sleep(1); // Simulate user wait time
}