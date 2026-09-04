import { test, expect } from '@playwright/test';

test('POST creates a post and returns 201', async ({ request }) => {
  const createResponse = await request.post('/posts', {
    data: {
      title: 'Playwright API test',
      body: 'Created by automated test',
      userId: 1
    }
  });

  expect(createResponse.status()).toBe(201);

  const createdPost = await createResponse.json();

  expect(createdPost.title).toBe('Playwright API test');
  expect(createdPost.body).toBe('Created by automated test');
  expect(createdPost.userId).toBe(1);
  expect(createdPost.id).toBeTruthy();
});

test('GET retrieves an existing post and returns 200', async ({ request }) => {
  const getResponse = await request.get('/posts/1');

  expect(getResponse.status()).toBe(200);

  const post = await getResponse.json();

  expect(post.id).toBe(1);
  expect(post.userId).toBe(1);
  expect(post.title).toBeTruthy();
  expect(post.body).toBeTruthy();
});

test('PATCH updates an existing post and returns 200', async ({ request }) => {
  const patchResponse = await request.patch('/posts/1', {
    data: {
      title: 'Updated title'
    }
  });

  expect(patchResponse.status()).toBe(200);

  const updatedPost = await patchResponse.json();

  expect(updatedPost.title).toBe('Updated title');
  expect(updatedPost.id).toBe(1);
});

test('DELETE removes an existing post and returns 200', async ({ request }) => {
  const deleteResponse = await request.delete('/posts/1');

  expect(deleteResponse.status()).toBe(200);
});
