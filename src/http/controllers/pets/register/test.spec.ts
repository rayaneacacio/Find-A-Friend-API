import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org Test',
      email: 'org@example.test.com',
      password: '123456',
      address: 'address org',
      phone: '1199999999'
    });
    
    const {body: {token}} = await request(app.server).post('/orgs/auth').send({
      email: 'org@example.test.com',
      password: '123456',
    });

    const response = await request(app.server).post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'my pet',
      description: 'about my pet',
      age: '0.3',
      dopted: false,
      images: ['my-pet.png'],
    });

    expect(response.statusCode).toEqual(201);
  });
});