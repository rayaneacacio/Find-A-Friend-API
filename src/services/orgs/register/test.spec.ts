import { InMemoryOrgsRepository } from '@/repositories/orgs/in-memory';
import { expect, describe, it, beforeEach } from 'vitest';
import { OrgAlreadyExistsError } from '../../errors';
import { RegisterService } from '.';

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterService;

const defaultOrg = {
  name: 'Org name',
  email: 'org@example.com',
  password: '123456',
  city: 'city org',
  phone: '1199999999'
};

describe('Register Org Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterService(orgsRepository)
  });

  it('should to register', async () => {
    const { org } = await sut.execute(defaultOrg);

    expect(org.id).toEqual(expect.any(String));
  });

  it('should not be able to register with same email twice', async () => {

    await sut.execute(defaultOrg);

    expect(async() => await sut.execute(defaultOrg)).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});