import type { PetsRepositories } from '@/repositories/pets/interface';
import { NoPetsAvailableError } from '@/services/errors';
import { type Pet } from '@prisma/client';

interface GetPetRequest {
  city: string;
  petAttributes?: string[]
};

interface GetPetResponse {
  pets: Pet[];
};

export class GetPetService {
  constructor(private petsRepository: PetsRepositories) {}

  async execute(data: GetPetRequest): Promise<GetPetResponse> {
    const { city, petAttributes } = data;

    const pets = await this.petsRepository.findByCity(city.toLowerCase(), petAttributes);

    if (!pets.length) throw new NoPetsAvailableError();
    
    return {pets};
  };
};