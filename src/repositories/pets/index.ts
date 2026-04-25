import { prisma } from '@/lib/prisma';
import type { Pet, PetsRepositories } from './interface.ts';

export class PrismaPetsRepository implements PetsRepositories {
  async create(data: Pet) {
    return await prisma.pet.create({data});
  };

  async setAttributes(attributes: string[], petId: string) {
    await prisma.petAttribute.createMany({
      data: attributes.map(attribute => ({name: attribute, petId})),
    });
  };

  async getAttributes(petId: string) {
    return await prisma.petAttribute.findMany({
      where: {
        petId
      }
    });
  };

  async findByCity(city: string) {
    return await prisma.pet.findMany({
      where: {
        org: {
          city: city.toLowerCase(),
        },
      },
    });
  };

};