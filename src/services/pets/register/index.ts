import type { PetsRepositories } from '@/repositories/pets/interface';
import { type Pet } from '@prisma/client';

interface RegisterPetRequest {
  name: string;
  description: string;
  age: number;
  adopted?: boolean;
  images: string[];
  orgId: string;
  petAttributes?: string[];
};

interface RegisterPetResponse {
  pet: Pet;
};

export class RegisterPetService {
  constructor(private petsRepository: PetsRepositories) {}

  async execute(data: RegisterPetRequest): Promise<RegisterPetResponse> {
    const { petAttributes, ...petData } = data;

    const pet = await this.petsRepository.create(petData);

    if (petAttributes?.length) await this.petsRepository.setAttributes(petAttributes, pet.id);

    return {pet};
  };
};