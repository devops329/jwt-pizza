import { test, expect } from 'playwright-test-coverage';

test('Invalid page', async ({ page }) => {
  await page.goto('http://localhost:5173/invalid');
  await page.goto('http://localhost:5173/invalid');
  await expect(page.getByRole('heading')).toContainText('Oops');
  await expect(page.getByRole('main')).toContainText('It looks like we have dropped a pizza on the floor. Please try another page.');
});

test('Home, about, history, franchise ', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
  await expect(page.getByRole('contentinfo')).toContainText('About');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('main')).toContainText('The secret sauce');
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByRole('heading')).toContainText('Mama Rucci, my my');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
  await page.getByText('So you want a piece of the').click();
  await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
});

test('Login and logout for j@j', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
    const request = route.request();
    const method = request.method();
    const postData = request.postDataJSON();
  
    if (method === 'PUT') {
      const loginReq = { email: 'j@j', password: 'j' };
      const loginRes = { user: { id: 2, name: 'j', email: 'j@j', roles: [{ role: 'diner' }] }, token: 'abcdef' };
      expect(postData).toMatchObject(loginReq);
      await route.fulfill({ json: loginRes });
    } else if (method === 'DELETE') {
      const logoutReq = { email: 'j@j', password: 'j' };
      const logoutRes = { user: { id: 2, name: 'j', email: 'j@j', roles: [{ role: 'diner' }] }, token: 'abcdef' };
      await route.fulfill({ json: logoutRes });
      await page.goto('http://localhost:5173/');
    } else {
      // Handle other methods if necessary
      route.continue();
    }
  });
  
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('j@j');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('j');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'j' })).toBeVisible();
  await expect(page.getByLabel('Global')).toContainText('j');
  await expect(page.locator('#navbar-dark')).toContainText('Logout');
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.locator('#navbar-dark')).toContainText('Login');
  await expect(page.locator('#navbar-dark')).toContainText('Register');
});

test('register new user', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    const registerReq = { name: 'new user 2', email: 'nu@nu', password: 'nu' };
    const registerRes = { user: { id: 3, name: 'new user 2', email: 'nu@nu', roles: [{ role: 'diner' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: registerRes });
    await page.goto('http://localhost:5173/');
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page.getByRole('heading')).toContainText('Welcome to the party');
  await expect(page.locator('form')).toContainText('Already have an account? Login instead.');
  await expect(page.locator('form')).toContainText('Register');
  await page.getByRole('textbox', { name: 'Full name' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('new user 2');
  await page.getByRole('textbox', { name: 'Full name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email address' }).fill('nu@nu');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('nu');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.locator('#navbar-dark')).toContainText('Logout');
  await expect(page.getByLabel('Global')).toContainText('n2');
  await expect(page.getByRole('link', { name: 'n2' })).toBeVisible();
});

// test('Order for j@j', async ({ page }) => {
//   await page.route('*/**/api/auth', async (route) => {
//     const loginReq = { email: 'j@j', password: 'j' };
//     const loginRes = { user: { id: 2, name: 'j', email: 'j@j', roles: [{ role: 'diner' }] }, token: 'abcdef' };
//     expect(route.request().method()).toBe('PUT');
//     expect(route.request().postDataJSON()).toMatchObject(loginReq);
//     await route.fulfill({ json: loginRes });
//   });
//   await page.route('*/**/api/order/menu', async (route) => {
//     const menuRes = [
//       { id: 1, title: 'Student Pizza', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
//       { id: 2, title: 'Teacher Pizza', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
//     ];
//     expect(route.request().method()).toBe('GET');
//     await route.fulfill({ json: menuRes });
//   });
//   await page.route('*/**/api/order', async (route) => {
//     const orderReq = {
//       items: [
//         { menuId: 1, description: 'Student Pizza', price: 0.0038 },
//         { menuId: 2, description: 'Teacher Pizza', price: 0.0042 },
//       ],
//       storeId: '4',
//       franchiseId: 2,
//     };
//     const orderRes = {
//       order: {
//         items: [
//           { menuId: 1, description: 'Student Pizza', price: 0.0038 },
//           { menuId: 2, description: 'Teacher Pizza', price: 0.0042 },
//         ],
//         storeId: '4',
//         franchiseId: 2,
//         id: 23,
//       },
//       jwt: 'eyJpYXQ',
//     };
//     expect(route.request().method()).toBe('POST');
//     expect(route.request().postDataJSON()).toMatchObject(orderReq);
//     await route.fulfill({ json: orderRes });
//   });
//   await page.route('*/**/api/payment', async (route) => {
//     const paymentReq = { orderId: 23, amount: 0.008, currency: 'BTC' };
//     const paymentRes = { orderId: 23, amount: 0.008, currency: 'BTC', status: 'paid' };
//     expect(route.request().method()).toBe('POST');
//     expect(route.request().postDataJSON()).toMatchObject(paymentReq);
//     await route.fulfill({ json: paymentRes });
//   });
//   await page.goto('http://localhost:5173/');
//   await page.getByRole('link', { name: 'Login' }).click();
//   await page.getByRole('textbox', { name: 'Email address' }).fill('j@j');
//   await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
//   await page.getByRole('textbox', { name: 'Password' }).fill('j');
//   await page.getByRole('textbox', { name: 'Password' }).press('Tab');
//   await page.getByRole('button', { name: 'Login' }).click();

//   // Wait for the login response
//   await page.waitForResponse(response => response.status() === 200);

//   await page.getByRole('link', { name: 'Order' }).click();
//   // await 
//   await expect(page.locator('h2')).toContainText('Awesome is a click away');
  
//   await page.waitForSelector('text=Student Pizza#lxz');
//   await page.getByRole('link', { name: /Student Pizza#lxz/ }).click();
//   await page.waitForSelector('select'); // Wait for the combobox to be available
//   await page.getByRole('combobox').selectOption('1');
//   await page.getByRole('button', { name: 'Checkout' }).click();
//   // await page.waitForResponse(response => response.status() === 200);

//   await expect(page.getByRole('heading')).toContainText('So worth it');
//   await expect(page.locator('tbody')).toContainText('Student Pizza#lxzcd4jag9');
//   await page.getByRole('button', { name: 'Pay now' }).click();

//   // Wait for the payment response
//   await page.waitForResponse(response => response.status() === 200);

//   await expect(page.getByRole('heading')).toContainText('Here is your JWT Pizza!');
//   await expect(page.getByText('order ID:')).toBeVisible();
// });

test('purchase with login professor', async ({ page }) => {
  await page.route('*/**/api/order/menu', async (route) => {
    const menuRes = [
      { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
      { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: menuRes });
  });

  await page.route('*/**/api/franchise', async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: 'LotaPizza',
        stores: [
          { id: 4, name: 'Lehi' },
          { id: 5, name: 'Springville' },
          { id: 6, name: 'American Fork' },
        ],
      },
      { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
      { id: 4, name: 'topSpot', stores: [] },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });

  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'd@jwt.com', password: 'a' };
    const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route('*/**/api/order', async (route) => {
    const orderReq = {
      items: [
        { menuId: 1, description: 'Veggie', price: 0.0038 },
        { menuId: 2, description: 'Pepperoni', price: 0.0042 },
      ],
      storeId: '4',
      franchiseId: 2,
    };
    const orderRes = {
      order: {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
        id: 23,
      },
      jwt: 'eyJpYXQ',
    };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(orderReq);
    await route.fulfill({ json: orderRes });
  });

  await page.goto('/');

  // Go to order page
  await page.getByRole('button', { name: 'Order now' }).click();

  // Create order
  await expect(page.locator('h2')).toContainText('Awesome is a click away');
  await page.getByRole('combobox').selectOption('4');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
  await expect(page.locator('form')).toContainText('Selected pizzas: 2');
  await page.getByRole('button', { name: 'Checkout' }).click();

  // Login
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('a');
  await page.getByRole('button', { name: 'Login' }).click();

  // Pay
  await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
  await expect(page.locator('tbody')).toContainText('Veggie');
  await expect(page.locator('tbody')).toContainText('Pepperoni');
  await expect(page.locator('tfoot')).toContainText('0.008 ₿');
  await page.getByRole('button', { name: 'Pay now' }).click();

  // Check balance
  await expect(page.getByText('0.008')).toBeVisible();

  //Verify order
  await page.getByRole('button', { name: 'Verify' }).click();
  await expect(page.locator('h3')).toContainText('JWT Pizza');
  await page.getByRole('button', { name: 'Close' }).click();
});


test('admin franchise', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('#navbar-dark')).toContainText('Admin');
  await expect(page.locator('#navbar-dark')).toContainText('Logout');
  await expect(page.getByLabel('Global')).toContainText('常');
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('main')).toContainText('Keep the dough rolling and the franchises signing up.');
  await expect(page.getByRole('main')).toContainText('Add Franchise');
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('Playwright franchise');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).click();
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('a@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByRole('table')).toContainText('Playwright franchise');
  await expect(page.getByRole('table')).toContainText('常用名字');
  await expect(page.getByRole('row', { name: 'Playwright franchise 常用名字' }).getByRole('button')).toBeVisible();
  await page.getByRole('row', { name: 'Playwright franchise 常用名字' }).getByRole('button').click();
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await expect(page.getByRole('main')).toContainText('Close');
  await page.getByRole('button', { name: 'Close' }).click();
});

test('Create and remove store', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('Franchisee@test.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('textbox', { name: 'Email address' }).dblclick();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('franchisee@test.com');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForResponse(response => response.status() === 200);
  await expect(page.locator('#navbar-dark')).toContainText('Franchise');
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  // await page.waitForResponse(response => response.status() === 200);
  await expect(page.getByRole('main')).toContainText('Create store');
  await page.getByRole('button', { name: 'Create store' }).click();
  await page.getByRole('textbox', { name: 'store name' }).click();
  await page.getByRole('textbox', { name: 'store name' }).fill('Test Store');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.locator('tbody')).toContainText('Test Store');
  await expect(page.locator('tbody')).toContainText('Close');
  await page.getByRole('row', { name: 'Test Store 0 ₿ Close' }).getByRole('button').click();
  await expect(page.getByRole('main')).toContainText('This cannot be restored. All outstanding revenue with not be refunded.');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.waitForResponse(response => response.status() === 200);
  await expect(page.getByRole('main')).toContainText('Everything you need to run an JWT Pizza franchise. Your gateway to success.');

});