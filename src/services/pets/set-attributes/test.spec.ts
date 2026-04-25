import { InMemoryPetsRepository } from '@/repositories/pets/in-memory';
import { expect, describe, it, beforeEach } from 'vitest';
import { SetAttributesService } from '.';
import { PetNotFoundError } from '@/services/errors';
import { hash } from 'bcryptjs';

let petsRepository: InMemoryPetsRepository;
let sut: SetAttributesService;

describe('Set Attributes Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SetAttributesService(petsRepository);
  });

  
  it('should be able to get pets by city', async () => {
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
      description: 'live in Fortaleza',
      age: 1,
      adopted: false,
      images: ['img.png'],
      orgId: '1',
    });

    await sut.execute({
      petId: pet.id,
      petAttributes: ['pink', 'cat']
    });

    const petAttributes = await petsRepository.getAttributes(pet.id);

    expect(petAttributes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'pink'
        }),
        expect.objectContaining({
          name: 'cat'
        })
      ])
    );
  });

  it('should reject it if no pets are found', async () => {
    await expect(() =>
      sut.execute({
        petId: 'random-id',
        petAttributes: []
      })
    ).rejects.toBeInstanceOf(PetNotFoundError);
  });
});