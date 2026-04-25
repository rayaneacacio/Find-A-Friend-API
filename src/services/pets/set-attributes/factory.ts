import { PrismaPetsRepository } from '@/repositories/pets';
import { SetAttributesService } from '.';

export const makeSetAttributesService = () => {
  const petsRepository = new PrismaPetsRepository();
  const petsService = new SetAttributesService(petsRepository);

  return petsService;
};