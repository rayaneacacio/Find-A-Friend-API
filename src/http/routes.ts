import { type FastifyInstance } from 'fastify';
import { orgsRoutes } from './controllers/orgs/routes';
import { petsRoutes } from './controllers/pets/routes';

export async function routes(app: FastifyInstance) {
  app.register(orgsRoutes);
  app.register(petsRoutes);
};