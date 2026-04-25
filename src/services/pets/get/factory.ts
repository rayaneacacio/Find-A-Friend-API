import { PrismaPetsRepository } from '@/repositories/pets';
import { GetPetService } from '.';

export const makeGetPetService = () => {
  const petsRepository = new PrismaPetsRepository();
  const petsService = new GetPetService(petsRepository);

  return petsService;
};