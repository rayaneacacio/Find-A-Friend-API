import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get by city', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Org Test',
      email: 'org@example.test.com',
      password: '123456',
      city: 'fortaleza',
      phone: '1199999999'
    });
    
    const {body: {token}} = await request(app.server).post('/orgs/auth').send({
      email: 'org@example.test.com',
      password: '123456',
    });

    await request(app.server).post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'my pet',
      description: 'live in fortaleza',
      age: '0.3',
      adopted: false,
      images: ['my-pet.png'],
    });

    const response = await request(app.server).get('/pets').query({ city: 'fortaleza' });

    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'live in fortaleza'
        })
      ])
    );
  });
});