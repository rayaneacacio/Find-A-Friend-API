import { type FastifyInstance } from 'fastify';
import { orgsRoutes } from './controllers/orgs/routes';

export async function routes(app: FastifyInstance) {
  app.register(orgsRoutes);
};