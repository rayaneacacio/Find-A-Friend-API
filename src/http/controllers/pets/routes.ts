import { type FastifyInstance } from 'fastify';
import { register } from './register';
import { verifyJwt } from '@/http/middlewares/verify-jwt';

export const petsRoutes = async(app: FastifyInstance) => {
  app.post('/pets', { onRequest: [verifyJwt] }, register);
};