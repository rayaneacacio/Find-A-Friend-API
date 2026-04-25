import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Details Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get pet details', async () => {
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

    const {body: {pet}} = await request(app.server).post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'my pet',
      description: 'about my pet',
      age: '0.3',
      adopted: false,
      images: ['my-pet.png'],
    });

    const response = await request(app.server).get('/pets/details').query({ petId: pet.id });

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        petAttributes: expect.any(Array)
      })
    );
  });
});