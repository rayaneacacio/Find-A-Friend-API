import { type PetAttribute, type Pet as PrismaPet } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import type { Pet, PetsRepositories } from './interface';

export class InMemoryPetsRepository implements PetsRepositories {
  public pets: PrismaPet[] = [];
  public petAttributes: PetAttribute[] = [];

  async create(data: Pet): Promise<PrismaPet> {
    const pet: PrismaPet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      adopted: data.adopted ?? false,
      images: data.images,
      orgId: (data as any).orgId,
    };

    this.pets.push(pet);

    return pet;
  }

  async setAttributes(attributes: string[], petId: string): Promise<void> {
    const formattedAttributes: PetAttribute[] = attributes.map(attribute => {
      return {
        id: randomUUID(), 
        name: attribute, 
        petId
      };
    });

    this.petAttributes = formattedAttributes;
  };

  async getAttributes(petId: string): Promise<PetAttribute[]> {
    return this.petAttributes;
  };
};