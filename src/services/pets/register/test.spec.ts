import { InMemoryPetsRepository } from '@/repositories/pets/in-memory';
import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterPetService } from '.';

let petsRepository: InMemoryPetsRepository;
let sut: RegisterPetService;

describe('Register Pet Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new RegisterPetService(petsRepository);
  });

  it('should to register', async () => {
    const { pet } = await sut.execute({
      name: 'my pet',
      description: 'about my pet',
      age: 0.3,
      adopted: false,
      images: ['my-pet.png'],
      orgId: '1'
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it('should be possible to register a pet with attributes', async () => {
    const {pet} = await sut.execute({
      name: 'my pet',
      description: 'about my pet',
      age: 0.3,
      adopted: false,
      images: ['my-pet.png'],
      orgId: '1',
      petAttributes: ['cute', 'protector']
    });

    const petAttributes = await petsRepository.getAttributes(pet.id);

    expect(petAttributes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          petId: expect.any(String),
        }),
      ])
    );
  
  });

});