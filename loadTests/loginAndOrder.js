import { sleep, check, group, fail } from 'k6';
import http from 'k6/http';

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
    Imported_HAR: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'imported_HAR',
    },
  },
};

// Scenario: Scenario_1 (executor: ramping-vus)
export function scenario_1() {
  let response;

  const vars = {};

  group('page_1 - https://pizza.byucsstudent.click/', function () {
    // Login
    response = http.put(
      'https://pizza-service.byucsstudent.click/api/auth',
      '{"email":"d@jwt.com","password":"diner"}',
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/json',
          origin: 'https://pizza.byucsstudent.click',
        },
      }
    );

    // Check login status
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Login was *not* 200');
    }

    vars.authToken = response.json().token;

    sleep(71.3);

    // Get Menu
    response = http.get('https://pizza-service.byucsstudent.click/api/order/menu', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${vars.authToken}`,
        origin: 'https://pizza.byucsstudent.click',
      },
    });

    // Get Franchise
    response = http.get('https://pizza-service.byucsstudent.click/api/franchise', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${vars.authToken}`,
        origin: 'https://pizza.byucsstudent.click',
      },
    });
    sleep(7.7);

    // Purchase Pizza
    response = http.post(
      'https://pizza-service.byucsstudent.click/api/order',
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          authorization: `Bearer ${vars.authToken}`,
          'content-type': 'application/json',
          origin: 'https://pizza.byucsstudent.click',
        },
      }
    );

    // Check purchase status
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Purchase request was *not* 200');
    }
  });
}

// Scenario: Imported_HAR (executor: ramping-vus)
export function imported_HAR() {
  let response;

  const vars = {};

  group('Login and Order - https://pizza.byucsstudent.click/', function () {
    // Login
    response = http.put(
      'https://pizza-service.byucsstudent.click/api/auth',
      '{"email":"d@jwt.com","password":"diner"}',
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/json',
          origin: 'https://pizza.byucsstudent.click',
        },
      }
    );

    // Check login status
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Login was *not* 200');
    }

    vars.authToken = response.json().token;

    sleep(71.3);

    // Get Menu
    response = http.get('https://pizza-service.byucsstudent.click/api/order/menu', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${vars.authToken}`,
        originI: 'https://pizza.byucsstudent.click',
      },
    });

    // Get Franchise
    response = http.get('https://pizza-service.byucsstudent.click/api/franchise', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${vars.authToken}`,
        origin: 'https://pizza.byucsstudent.click',
      },
    });
    sleep(7.7);

    // Purchase Pizza
    response = http.post(
      'https://pizza-service.byucsstudent.click/api/order',
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          authorization: `Bearer ${vars.authToken}`,
          'content-type': 'application/json',
          origin: 'https://pizza.byucsstudent.click',
        },
      }
    );

    // Check purchase status
    if (!check(response, { 'status equals 200': response => response.status.toString() === '200' })) {
      console.log(response.body);
      fail('Purchase request was *not* 200');
    }

    // Capture the JWT from the purchase response
    vars.orderJwt = response.json().jwt;

    sleep(3.3);

    // Verify Pizza using the captured JWT
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      `{"jwt":"${vars.orderJwt}"}`,
      {
        headers: {
          accept: '*/*',
          authorization: `Bearer ${vars.authToken}`,
          'content-type': 'application/json',
          origin: 'https://pizza.byucsstudent.click',
        },
      }
    );
  });
}
