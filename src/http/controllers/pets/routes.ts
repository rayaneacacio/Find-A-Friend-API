import { type FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { register } from './register';
import { get } from './get';

export const petsRoutes = async(app: FastifyInstance) => {
  app.post('/pets', { onRequest: [verifyJwt] }, register);
  app.get('/pets', get);
};