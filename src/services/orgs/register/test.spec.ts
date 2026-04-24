import { InMemoryOrgsRepository } from '@/repositories/orgs/in-memory';
import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterService } from '.';
import { OrgAlreadyExistsError } from '../errors';

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterService;

describe('Register Org Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterService(orgsRepository)
  });

  it('should to register', async () => {
    const { org } = await sut.execute({
      name: 'Org name',
      email: 'org@example.com',
      password: '123456',
      address: 'address org',
      phone: '1199999999'
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it('should not be able to register with same email twice', async () => {
    const org = {
      name: 'Org name',
      email: 'org@example.com',
      password: '123456',
      address: 'address org',
      phone: '1199999999'
    };

    await sut.execute(org);

    expect(async() => await sut.execute(org)).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});