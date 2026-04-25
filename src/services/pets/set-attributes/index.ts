import type { PetsRepositories } from '@/repositories/pets/interface';
import { PetNotFoundError } from '@/services/errors';
import type { Pet } from '@prisma/client';

interface SetAttributesRequest {
  petAttributes: string[];
  petId: string;
};

interface SetAttributesResponse {
};

export class SetAttributesService {
  constructor(private petsRepository: PetsRepositories) {}

  async execute(data: SetAttributesRequest): Promise<SetAttributesResponse> {
    const { petAttributes, petId } = data;

    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new PetNotFoundError();

    await this.petsRepository.setAttributes(petAttributes, petId);
    
    return {};
  };
};