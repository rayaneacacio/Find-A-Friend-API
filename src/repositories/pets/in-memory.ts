import { type PetAttribute, type Pet as PrismaPet, type Org } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import type { Pet, PetsRepositories, PetWithAttributes } from './interface';

export class InMemoryPetsRepository implements PetsRepositories {
  public pets: PrismaPet[] = [];
  public petAttributes: PetAttribute[] = [];
  public orgs:Org[] = [];

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
    return this.petAttributes.filter(petAttribute => petAttribute.petId === petId);
  };

  async findById(petId: string): Promise<PetWithAttributes | null> {
    const petFound = this.pets.find(pet => pet.id === petId);

    if(!petFound) return null;

    return {
      ...petFound,
      petAttributes: await this.getAttributes(petFound.id)
    };
  };

  async findByCity(city: string, petAttributes?: string[]) {
    const filteredPets = this.pets.filter((pet) => {
      const org = this.orgs.find((org) => org.id === pet.orgId);
      const matchesCity = org?.city.toLowerCase() === city.toLowerCase();

      if (!matchesCity) return false;

      if (petAttributes?.length === 0) return true;

      const currentPetAttributes = this.petAttributes.filter(attr => attr.petId === pet.id);

      const hasMatchingAttribute = currentPetAttributes.some(attr => petAttributes?.includes(attr.name));

      return hasMatchingAttribute;
    });

    const petsFound = await Promise.all(filteredPets.map(async (filteredPet) => {
      return {
        ...filteredPet,
        petAttributes: await this.getAttributes(filteredPet.id),
      };
    }));

    return petsFound;
  };
};