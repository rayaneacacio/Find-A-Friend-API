import { type PetAttribute, type Pet as PrismaPet } from '@prisma/client';

export interface Pet {
  name: string;
  description: string;
  age: number;
  adopted?: boolean;
  images: string[];
  orgId: string;
};

export interface PetsRepositories {
  create(data: Pet): Promise<PrismaPet>;
  setAttributes(attributes: string[], petId: string): Promise<void>;
  getAttributes(petId: string): Promise<PetAttribute[]>;
  findByCity(city: string): Promise<PrismaPet[]>;
};