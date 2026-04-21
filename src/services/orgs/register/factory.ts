import { RegisterService } from '../register';
import { PrismaOrgsRepository } from '@/repositories/orgs';

export const makeRegisterOrgService = () => {
  const orgsRepository = new PrismaOrgsRepository();
  const orgsService = new RegisterService(orgsRepository);

  return orgsService;
};