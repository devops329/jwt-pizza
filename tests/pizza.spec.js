import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});


test('buy pizza with login', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 1, name: 'pizza diner', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  page.route('*/**/api/order', route => {
    if (route.request().method() === 'POST') {
      const orderPost = {
        order: {
          items: [
            {
              menuId: 1,
              description: "Veggie",
              price: 0.018
            },
            {
              menuId: 2,
              description: "Margarita",
              price: 0.0
            }
          ],
          storeId: "1",
          franchiseId: 1,
          id: 13
        },
        jwt: "test"
      };
      expect(route.request().method()).toBe('POST');
      route.fulfill({ json: orderPost });
    }
  });
  page.route('*/**/api/order/menu', route => {
    const menuGet = [
      {
        id: 1,
        name: "Veggie A",
        description: "Veggie",
        image: "veggie.jpg",
        price: 0.018
      },
      {
        id: 2,
        name: "Margarita",
        description: "Margarita",
        image: "margarita.jpg",
        price: 0.0
      }
    ];
    expect(route.request().method()).toBe('GET');
    route.fulfill({ json: menuGet });
  }
  )

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.locator('div').filter({ hasText: /^choose storeSLC$/ }).click();
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Pay now' }).click();
  await expect(page.getByRole('main')).toContainText('0.018 ₿');
});

test('invalid login', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { code: 404, message: 'unknown user' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('test@test.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('arstarstarstarst');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('main')).toContainText('{"code":404,"message":"unknown user"}');
});

test('register', async ({ page }) => {
  await page.route('*/**/api/auth', route => {
    const registerReq = { user: { id: 4, name: 'test', email: 'test@test.com', roles: [{ role: 'diner' }] }, token: 'test' };
    expect(route.request().method()).toBe('POST');
    route.fulfill({ json: registerReq });
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('Full name').fill('test');
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('test@test.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByLabel('Global')).toContainText('t');
});

test('many different views', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('main')).toContainText('Pizza is an absolute delight that brings joy to people of all ages. The perfect combination of crispy crust, savory sauce, and gooey cheese makes pizza an irresistible treat. At JWT Pizza, we take pride in serving the web\'s best pizza, crafted with love and passion. Our skilled chefs use only the finest ingredients to create mouthwatering pizzas that will leave you craving for more. Whether you prefer classic flavors or adventurous toppings, our diverse menu has something for everyone. So why wait? Indulge in the pizza experience of a lifetime and visit JWT Pizza today!');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('main')).toContainText('At JWT Pizza, our amazing employees are the secret behind our delicious pizzas. They are passionate about their craft and spend every waking moment dreaming about how to make our pizzas even better. From selecting the finest ingredients to perfecting the dough and sauce recipes, our employees go above and beyond to ensure the highest quality and taste in every bite. Their dedication and attention to detail make all the difference in creating a truly exceptional pizza experience for our customers. We take pride in our team and their commitment to delivering the best pizza in town.');
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByRole('main')).toContainText('Pizza has a long and rich history that dates back thousands of years. Its origins can be traced back to ancient civilizations such as the Egyptians, Greeks, and Romans. The ancient Egyptians were known to bake flatbreads topped with various ingredients, similar to modern-day pizza. In ancient Greece, they had a dish called "plakous" which consisted of flatbread topped with olive oil, herbs, and cheese.');
});

test('logout', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    if (route.request().method() === 'PUT') {
      const loginReq = { user: { id: 1, name: '常', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'test' };
      expect(route.request().method()).toBe('PUT');
      route.fulfill({ json: loginReq });
    } else {
      const logoutDel = { code: 200, message: 'logout successful' };
      expect(route.request().method()).toBe('DELETE');
      route.fulfill({ json: logoutDel });
    }
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByLabel('Global')).toContainText('常');
  await page.getByRole('link', { name: 'Logout' }).click();
});

test('logout2', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    if (route.request().method() === 'PUT') {
      const loginReq = { user: { id: 1, name: '常', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'test' };
      expect(route.request().method()).toBe('PUT');
      route.fulfill({ json: loginReq });
    } else {
      const logoutDel = { code: 200, message: 'logout successful' };
      expect(route.request().method()).toBe('DELETE');
      route.fulfill({ json: logoutDel });
    }
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Order' }).click();
  await page.waitForTimeout(1000);
  await expect(page.locator('h2')).toContainText('Awesome is a click away');
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('main')).toContainText('Pizza is an absolute delight that brings joy to people of all ages. The perfect combination of crispy crust, savory sauce, and gooey cheese makes pizza an irresistible treat. At JWT Pizza, we take pride in serving the web\'s best pizza, crafted with love and passion. Our skilled chefs use only the finest ingredients to create mouthwatering pizzas that will leave you craving for more. Whether you prefer classic flavors or adventurous toppings, our diverse menu has something for everyone. So why wait? Indulge in the pizza experience of a lifetime and visit JWT Pizza today!');
});

test('admin view', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 1, name: '常', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading')).toContainText('Mama Ricci\'s kitchen');
  //await expect(page.locator('tbody')).toContainText('pizza franchisee');
  //await expect(page.locator('tbody')).toContainText('pizzaPocket');
});

test('franchisee', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 2, name: 'pizza franchisee', email: 'f@jwt.com', roles: [{ role: 'franchisee' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  page.route('*/**/api/franchise/2', route => {
    const franchiseGet = {
      id: 2,
      name: "pizzaPocket",
      admins: [
        {
          id: 2,
          name: "pizza franchisee",
          email: "f@jwt.com",
          roles: [
            {
              role: "franchisee"
            }
          ]
        }
      ],
      stores: [
        {
          id: 1,
          name: "SLC",
          totalRevenue: 0.1828
        }
      ]
    };

    expect(route.request().method()).toBe('GET');
    route.fulfill({ json: franchiseGet });
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('f@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading')).toContainText('pizzaPocket');
  await expect(page.locator('tbody')).toContainText('SLC');
  await expect(page.getByRole('main')).toContainText('Everything you need to run an JWT Pizza franchise. Your gateway to success.');
});

test('create and close store', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 2, name: 'pizza franchisee', email: 'f@jwt.com', roles: [{ role: 'franchisee' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  page.route('*/**/api/franchise/2', route => {
    const franchiseGet = {
      id: 2,
      name: "pizzaPocket",
      admins: [
        {
          id: 2,
          name: "pizza franchisee",
          email: "f@jwt.com",
          roles: [
            {
              role: "franchisee"
            }
          ]
        }
      ],
      stores: [
        {
          id: 1,
          name: "SLC",
          totalRevenue: 0.1828
        }
      ]
    };

    expect(route.request().method()).toBe('GET');
    route.fulfill({ json: franchiseGet });
  });
  page.route('*/**/api/franchise/2/store', route => {
    const storePost = {
      id: 2,
      name: "test",
      franchiseId: 2,
    }
    expect(route.request().method()).toBe('POST');
    route.fulfill({ json: storePost });
  });
  page.route('*/**/api/franchise/2/store/2', route => {
    const storeGet = {
      id: 2,
      name: "test",
      franchiseId: 2,
      totalRevenue: 0
    }
    expect(route.request().method()).toBe('GET');
    route.fulfill({ json: storeGet });
  });
  page.route('*/**/api/franchise/2/store/2', route => {
    const storeDelete = {
      id: 2,
      name: "test",
      franchiseId: 2,
      totalRevenue: 0
    }
    expect(route.request().method()).toBe('DELETE');
    route.fulfill({ json: storeDelete });
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('f@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('franchisee');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Create store' }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('store name').click();
  await page.getByPlaceholder('store name').fill('test');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.waitForTimeout(1000);
  await expect(page.locator('tbody')).toContainText('0 ₿');
  await page.getByRole('row', { name: 'test 0 ₿ Close' }).getByRole('button').click();
  await expect(page.getByRole('main')).toContainText('Are you sure you want to close the pizzaPocket store test ? This cannot be restored. All outstanding revenue with not be refunded.');
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Close' }).click();
});

test('diner dashboard', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 1, name: 'pizza diner', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  page.route('*/**/api/order', route => {
    const orderPost = {
      order: {
        items: [
          {
            menuId: 1,
            description: "Veggie",
            price: 0.018
          },
          {
            menuId: 2,
            description: "Margarita",
            price: 0.0
          }
        ],
        storeId: "1",
        franchiseId: 1,
        id: 13
      },
      jwt: "test"
    };
    expect(route.request().method()).toBe('POST');
    route.fulfill({ json: orderPost });
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('diner');
  await page.locator('div').filter({ hasText: /^Login$/ }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Order' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: 'Image Description Margarita' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'pd' }).click();
  await expect(page.getByRole('main')).toContainText('pizza diner');
  await expect(page.getByRole('main')).toContainText('diner');
  await expect(page.getByRole('list')).toContainText('diner-dashboard');
});

test('delivery', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 1, name: 'pizza diner', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  page.route('*/**/api/order', route => {
    const orderPost = {
      order: {
        items: [
          {
            menuId: 1,
            description: "Veggie",
            price: 0.018
          },
          {
            menuId: 2,
            description: "Margarita",
            price: 0.0
          }
        ],
        storeId: "1",
        franchiseId: 1,
        id: 13
      },
      jwt: "test"
    };
    expect(route.request().method()).toBe('POST');
    route.fulfill({ json: orderPost });
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('link', { name: 'Image Description Margarita' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.waitForTimeout(20000);
  await expect(page.getByRole('heading')).toContainText('Here is your JWT Pizza!');
  await expect(page.getByRole('list')).toContainText('delivery');
  await expect(page.getByRole('main')).toContainText('0.008 ₿');
  await expect(page.getByRole('main')).toContainText('2');
  await expect(page.getByRole('main')).toContainText('pie count:');
  await expect(page.getByRole('main')).toContainText('Verify');;
});

test('diner dashboard 2', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 1, name: 'pizza diner', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  await page.goto('http://localhost:5173/diner-dashboard');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.goto('http://localhost:5173/diner-dashboard');
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading')).toContainText('Your pizza kitchen');
  await expect(page.getByRole('img', { name: 'Employee stock photo' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('pizza diner');
});

test('admin dashboard', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 1, name: '常', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  page.route('*/**/api/franchise', route => {
    const franchiseGet = [
      {
        id: 1,
        name: "pizzaPocket",
        admins: [
          {
            id: 1,
            name: "pizza franchisee",
            email: "f@jwt.com",
            roles: [
              {
                role: "franchisee"
              }
            ]
          }
        ],
        stores: [
          {
            id: 1,
            name: "SLC",
            totalRevenue: 0.1828
          }
        ]
      }
    ];
    expect(route.request().method()).toBe('GET');
    route.fulfill({ json: franchiseGet });
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('row', { name: 'SLC 0.16 ₿ Close' }).getByRole('button').click();
  await expect(page.getByRole('list')).toContainText('close-store');
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await expect(page.getByRole('main')).toContainText('Are you sure you want to close the pizzaPocket store SLC ? This cannot be restored. All outstanding revenue with not be refunded.');
  await expect(page.getByRole('main')).toContainText('Cancel');
  await page.getByRole('button', { name: 'Cancel' }).click();
  await page.getByRole('row', { name: 'pizzaPocket pizza franchisee' }).getByRole('button').click();
  await expect(page.getByRole('list')).toContainText('close-franchise');
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await expect(page.getByRole('main')).toContainText('Are you sure you want to close the pizzaPocket franchise? This will close all associated stores and cannot be restored. All outstanding revenue with not be refunded.');
  await page.getByRole('button', { name: 'Cancel' }).click();
});

test('add franchise', async ({ page }) => {
  await page.route('*/**/api/auth', route => {
    if (route.request().method() === 'PUT') {
      const loginReq = { user: { id: 1, name: '常', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'test' };
      expect(route.request().method()).toBe('PUT');
      route.fulfill({ json: loginReq });
    } else if (route.request().method() === 'POST') {
      const registerReq = { user: { id: 4, name: 'test', email: 'test@test.com', roles: [{ role: 'diner' }] }, token: 'test' };
      expect(route.request().method()).toBe('POST');
      route.fulfill({ json: registerReq });
    } else {
      const logoutDel = { code: 200, message: 'logout successful' };
      expect(route.request().method()).toBe('DELETE');
      route.fulfill({ json: logoutDel });
    }
  });
  await page.route('*/**/api/franchise', route => {
    if (route.request().method() === 'POST') {
    
      const franchisePost = {
        id: 2,
        name: "test",
        admins: [
          {
            id: 4,
            name: "test",
            email: "test@test.com",
            roles: [
              {
                role: "franchisee"
              }
            ]
          }
        ],
        stores: []
      };
      expect(route.request().method()).toBe('POST');
      route.fulfill({ json: franchisePost });
    } else {
      const franchiseGet = [
        {
          id: 1,
          name: "pizzaPocket",
          admins: [
            {
              id: 1,
              name: "pizza franchisee",
              email: "f@jwt.com",
              roles: [
                {
                  role: "franchisee"
                }
              ]
            }
          ],
          stores: [
            {
              id: 1,
              name: "SLC",
              totalRevenue: 0.1828
            }
          ]
        },

        {
          id: 2,
          name: "test",
          admins: [
            {
              id: 4,
              name: "test",
              email: "test@test.com",
              roles: [
                {
                  role: "franchisee"
                }
              ]
            }
          ],
          stores: []
        }
      ];
      expect(route.request().method()).toBe('GET');
      route.fulfill({ json: franchiseGet });
    }
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('Full name').fill('test');
  await page.getByPlaceholder('Full name').press('Tab');
  await page.getByPlaceholder('Email address').fill('test@test.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('franchise name').click();
  await page.getByPlaceholder('franchise name').fill('test');
  await page.getByPlaceholder('franchisee admin email').click();
  await page.getByPlaceholder('franchisee admin email').fill('test@test.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('test@test.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByText('OrderFranchiseLogout').click();
  await page.waitForTimeout(1000);
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('button', { name: 'Create store' }).click();
  await page.waitForTimeout(1000);
  await page.getByPlaceholder('store name').click();
  await page.getByPlaceholder('store name').fill('test');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.waitForTimeout(1000);
  await expect(page.locator('tbody')).toContainText('test');
  await expect(page.locator('tbody')).toContainText('0 ₿');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('row', { name: 'test test Close' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();
});

test('docs', async ({ page }) => {
  await page.goto('http://localhost:5173/docs');
  await expect(page.getByRole('main')).toContainText('JWT Pizza API');
  //await expect(page.getByRole('main')).toContainText('curl -X POST localhost:3000/api/auth -d \'{"name":"pizza diner", "email":"d@jwt.com", "password":"diner"}\' -H \'Content-Type: application/json\'');
  //await expect(page.getByRole('main')).toContainText('🔐 [PUT] /api/auth/:userId');
  //await expect(page.getByRole('main')).toContainText('🔐 [DELETE] /api/franchise/:franchiseId/store/:storeId');
});

test('not logged in diner dashboard', async ({ page }) => {
  await page.goto('http://localhost:5173/diner-dashboard');
  await expect(page.getByRole('main')).toContainText('It looks like we have dropped a pizza on the floor. Please try another page.');
});

test('delivery mocked', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 1, name: 'pizza diner', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  await page.route('*/**/api/order', route => {
    const orderPost = {
      order: {
        items: [
          {
            menuId: 1,
            description: "Veggie",
            price: 0.0038
          }
        ],
        storeId: "1",
        franchiseId: 1,
        id: 13
      },
      jwt: "test"
    };
    expect(route.request().method()).toBe('POST');
    route.fulfill({ json: orderPost });
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Order' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.waitForTimeout(30000);
  await expect(page.getByRole('main')).toContainText('test');
  await expect(page.getByRole('main')).toContainText('13');
});

test('verify mocked', async ({ page }) => {
  page.route('*/**/api/auth', route => {
    const loginReq = { user: { id: 1, name: 'pizza diner', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'test' };
    expect(route.request().method()).toBe('PUT');
    route.fulfill({ json: loginReq });
  });
  await page.route('*/**/api/order', route => {
    const orderPost = {
      order: {
        items: [
          {
            menuId: -1,
            description: "Veggie",
            price: 0.0038
          }
        ],
        storeId: "1",
        franchiseId: 1,
        id: 13
      },
      jwt: "test"
    };
    expect(route.request().method()).toBe('POST');
    route.fulfill({ json: orderPost });
  });
  await page.route('*/**/api/order/verify', route => {
    const verifyPost = {
      message: "valid",
      payload: {
        vendor: {
          id: "user",
          name: "User"
        },
        diner: {
          id: 7,
          name: "pizza diner",
          email: "d@jwt.com"
        },
        order: {
          items: [
            {
              menuId: 1,
              description: "Veggie",
              price: 0.0038
            }
          ],
          storeId: "1",
          franchiseId: 1,
          id: 16
        }
      }
    };

    expect(route.request().method()).toBe('POST');
    route.fulfill({ json: verifyPost });
    });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Order' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.waitForTimeout(30000);
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.waitForTimeout(3000);
  await expect(page.locator('pre')).toContainText('{ "vendor": { "id": "user", "name": "User" }, "diner": { "id": 7, "name": "pizza diner", "email": "d@jwt.com" }, "order": { "items": [ { "menuId": 1, "description": "Veggie", "price": 0.0038 } ], "storeId": "1", "franchiseId": 1, "id": 16 } }');
  await expect(page.locator('h3')).toContainText('valid');
  await page.getByRole('button', { name: 'Close' }).click();
});

test('verify mocked fail', async ({ page }) => {
  await page.route('*/**/api/order', route => {
    const orderPost = {
      order: {
        items: [
          {
            menuId: -1,
            description: "Veggie",
            price: 0.0038
          }
        ],
        storeId: "1",
        franchiseId: 1,
        id: 13
      },
      jwt: "test"
    };
    expect(route.request().method()).toBe('POST');
    route.fulfill({ json: orderPost });
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('d@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'Order' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('combobox').selectOption('1');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Pay now' }).click();
  await page.waitForTimeout(30000);
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.waitForTimeout(3000);
  await expect(page.locator('pre')).toContainText('{"error": "invalid JWT. Looks like you have a bad pizza!"}');
  await expect(page.locator('h3')).toContainText('invalid');
});

test('add franchise mocked', async ({ page }) => {
  await page.route('*/**/api/auth', route => {
    if (route.request().method() === 'PUT') {
      const loginReq = { user: { id: 1, name: '常', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'test' };
      expect(route.request().method()).toBe('PUT');
      route.fulfill({ json: loginReq });
    } else if (route.request().method() === 'POST') {
      const registerReq = { user: { id: 4, name: 'test', email: 'test@test.com', roles: [{ role: 'diner' }] }, token: 'test' };
      expect(route.request().method()).toBe('POST');
      route.fulfill({ json: registerReq });
    } else {
      const logoutDel = { code: 200, message: 'logout successful' };
      expect(route.request().method()).toBe('DELETE');
      route.fulfill({ json: logoutDel });
    }
  });
  await page.route('*/**/api/franchise', route => {
    if (route.request().method() === 'POST') {
      const franchisePost = { id: 4, name: 'test', admins: [{ id: 9, name: 'test', email: 'test@test.com' }], stores: [] };
      expect(route.request().method()).toBe('POST');
      route.fulfill({ json: franchisePost });
    } else if (route.request().method() === 'GET') {
      
      const franchiseGet = [
        {
          "id": 1,
          "name": "pizzaPocket",
          "admins": [
            {
              "id": 8,
              "name": "pizza franchisee",
              "email": "f@jwt.com"
            }
          ],
          "stores": [
            {
              "id": 1,
              "name": "SLC",
              "totalRevenue": 0.1828
            }
          ]
        },
        {
          "id": 3,
          "name": "test",
          "admins": [
            {
              "id": 9,
              "name": "test",
              "email": "test@test.com"
            }
          ],
          "stores": []
        }
      ];
      expect(route.request().method()).toBe('GET');
      route.fulfill({ json: franchiseGet });

    }
  });
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByPlaceholder('Full name').fill('test');
  await page.getByPlaceholder('Full name').press('Tab');
  await page.getByPlaceholder('Email address').fill('test@test.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByPlaceholder('franchise name').click();
  await page.getByPlaceholder('franchise name').fill('test');
  await page.getByPlaceholder('franchisee admin email').click();
  await page.getByPlaceholder('franchisee admin email').fill('test@test.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('test@test.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('OrderFranchiseLogout').click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('button', { name: 'Create store' }).click();
  await page.getByPlaceholder('store name').click();
  await page.getByPlaceholder('store name').fill('test');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.locator('tbody')).toContainText('test');
  await expect(page.locator('tbody')).toContainText('0 ₿');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('a@jwt.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('row', { name: 'test test Close' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();
});