import type { PetsRepositories } from '@/repositories/pets/interface';
import { PetNotFoundError } from '@/services/errors';
import { type Pet } from '@prisma/client';

interface DetailsPetRequest {
  petId: string;
};

interface DetailsPetResponse {
  pet: Pet
};

export class DetailsPetService {
  constructor(private petsRepository: PetsRepositories) {}

  async execute(data: DetailsPetRequest): Promise<DetailsPetResponse> {
    const { petId } = data;

    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new PetNotFoundError();

    return {pet};
  };
};