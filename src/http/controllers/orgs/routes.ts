import { type FastifyInstance } from 'fastify';
import { register } from './register';

export const orgsRoutes = async(app: FastifyInstance) => {
  app.post('/orgs', register);
};