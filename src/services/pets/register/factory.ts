import { PrismaPetsRepository } from '@/repositories/pets';
import { RegisterPetService } from '.';

export const makeRegisterPetService = () => {
  const petsRepository = new PrismaPetsRepository();
  const petsService = new RegisterPetService(petsRepository);

  return petsService;
};