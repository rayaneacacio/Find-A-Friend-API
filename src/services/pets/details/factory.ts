import { PrismaPetsRepository } from '@/repositories/pets';
import { DetailsPetService } from '.';

export const makeDetailsPetService = () => {
  const petsRepository = new PrismaPetsRepository();
  const petsService = new DetailsPetService(petsRepository);

  return petsService;
};