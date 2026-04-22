import { type FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';

export const orgsRoutes = async(app: FastifyInstance) => {
  app.post('/orgs', register);
  app.post('/orgs/auth', authenticate);
};