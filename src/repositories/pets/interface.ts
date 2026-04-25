import { type PetAttribute, type Pet as PrismaPet } from '@prisma/client';

export interface Pet {
  name: string;
  description: string;
  age: number;
  adopted?: boolean;
  images: string[];
  orgId: string;
};

export type PetWithAttributes = PrismaPet & {
  petAttributes: PetAttribute[];
};

export interface PetsRepositories {
  create(data: Pet): Promise<PrismaPet>;
  setAttributes(attributes: string[], petId: string): Promise<void>;
  getAttributes(petId: string): Promise<PetAttribute[]>;
  findById(petId: string): Promise<PetWithAttributes | null>;
  findByCity(city: string, petAttributes?: string[]): Promise<PrismaPet[]>;
};