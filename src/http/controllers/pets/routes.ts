import { type FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { register } from './register';
import { setAttributes } from './set-attributes';
import { get } from './get';
import { details } from './details';

export const petsRoutes = async(app: FastifyInstance) => {
  app.post('/pets', { onRequest: [verifyJwt] }, register);
  app.post('/pets/attributes', { onRequest: [verifyJwt] }, setAttributes);
  app.get('/pets', get);
  app.get('/pets/details', details);
};