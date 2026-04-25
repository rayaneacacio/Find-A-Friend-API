import { InMemoryPetsRepository } from '@/repositories/pets/in-memory';
import { expect, describe, it, beforeEach } from 'vitest';
import { DetailsPetService } from '.';
import { PetNotFoundError } from '@/services/errors';
import { hash } from 'bcryptjs';

let petsRepository: InMemoryPetsRepository;
let sut: DetailsPetService;

describe('Details Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new DetailsPetService(petsRepository);
  });

  
  it('should be able to get pet details', async () => {
    petsRepository.orgs.push({
      id: '1',
      name: 'Org name',
      email: 'org@example.com',
      passwordHash: await hash('123456', 6),
      city: 'Fortaleza',
      phone: '1199999999',
      created_at: new Date
    });

    const pet = await petsRepository.create({
      name: 'my pet',
      description: '',
      age: 1,
      adopted: false,
      images: ['img.png'],
      orgId: '1',
    });

    const {pet: petDetails} = await sut.execute({petId: pet.id});

    expect(petDetails).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        petAttributes: expect.any(Array)
      }),
    );
  });

  it('should reject it if no pets are found', async () => {
    await expect(() =>
      sut.execute({
        petId: 'random-id',
      })
    ).rejects.toBeInstanceOf(PetNotFoundError);
  });
});