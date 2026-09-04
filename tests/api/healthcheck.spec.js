import { test, expect } from '@playwright/test';

test('SauceDemo homepage healthcheck', async ({ request }) => {
  const response = await request.get('https://www.saucedemo.com/');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('text/html');

  const body = await response.text();
  expect(body).toContain('Swag Labs');
});
