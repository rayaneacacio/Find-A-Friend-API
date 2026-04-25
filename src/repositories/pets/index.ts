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

  async findById(petId: string) {
    return await prisma.pet.findUnique({
      where: {
        id: petId
      },
      include: {
        petAttributes: true
      },
    });
  };

 async findByCity(city: string, petAttributes?: string[]) {
  const pets = await prisma.pet.findMany({
    where: {
      org: {
        city: {
          equals: city.toLowerCase(),
          mode: 'insensitive'
        },
      },
      ...(petAttributes && petAttributes.length > 0 && {
        petAttributes: {
          some: {
            name: {
              in: petAttributes
            },
          },
        },
      }),
    },
    include: {
      petAttributes: true
    },
  });

  return pets;
}

};