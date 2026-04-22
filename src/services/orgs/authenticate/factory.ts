import { PrismaOrgsRepository } from '@/repositories/orgs';
import { AuthenticateService } from '.';

export const makeAuthenticateOrgService = () => {
  const orgsRepository = new PrismaOrgsRepository();
  const orgsService = new AuthenticateService(orgsRepository);

  return orgsService;
};