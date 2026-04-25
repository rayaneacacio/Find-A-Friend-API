import { InMemoryPetsRepository } from '@/repositories/pets/in-memory';
import { expect, describe, it, beforeEach } from 'vitest';
import { GetPetService } from '.';
import { NoPetsAvailableError } from '@/services/errors';
import { hash } from 'bcryptjs';

let petsRepository: InMemoryPetsRepository;
let sut: GetPetService;

describe('Get Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetService(petsRepository);
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

    await petsRepository.setAttributes(['pink'], pet.id);

    const { pets } = await sut.execute({city: 'fortaleza', petAttributes: ['pink']});

    expect(pets).toHaveLength(1);
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'live in Fortaleza',
        }),
      ])
    );
  });

  it('should throw when no pets are found', async () => {
    await expect(() =>
      sut.execute({
        city: 'fortaleza',
      })
    ).rejects.toBeInstanceOf(NoPetsAvailableError);
  });

});