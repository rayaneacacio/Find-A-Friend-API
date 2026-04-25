import type { PetsRepositories } from '@/repositories/pets/interface';
import { PetNotFoundError } from '@/services/errors';
import { type Pet, type PetAttribute } from '@prisma/client';

interface DetailsPetRequest {
  petId: string;
};

interface DetailsPetResponse {
  pet: Pet & {
    petAttributes: PetAttribute[]
  };
};

export class DetailsPetService {
  constructor(private petsRepository: PetsRepositories) {}

  async execute(data: DetailsPetRequest): Promise<DetailsPetResponse> {
    const { petId } = data;

    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new PetNotFoundError();

    const petAttributes = await this.petsRepository.getAttributes(petId);
    
    return {
      pet:{
        ...pet,
        petAttributes
      }
    };
  };
};