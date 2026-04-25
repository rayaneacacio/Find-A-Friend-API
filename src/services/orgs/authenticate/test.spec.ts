import { InMemoryOrgsRepository } from '@/repositories/orgs/in-memory';
import { expect, describe, it, beforeEach } from 'vitest';
import { AuthenticateService } from '.';
import { OrgAuthenticateError } from '../../errors';
import { hash } from 'bcryptjs';

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateService;

const createOrg = async() => {
  return await orgsRepository.create({
    name: 'Org name',
    email: 'org@example.com',
    passwordHash: await hash('123456', 6),
    city: 'city org',
    phone: '1199999999'
  });
};

describe('Authenticate Org Service', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateService(orgsRepository);
  });

  it('should to authenticate', async () => {
    await createOrg();

    const {org} = await sut.execute({email: 'org@example.com',password: '123456'});

    expect(org.id).toEqual(expect.any(String));
  });

  it('It should not be possible to authenticate with the wrong password', async () => {
    await createOrg();

    expect(async() => 
      await sut.execute({email: 'org@example.com',password: '111111'}))
    .rejects.toBeInstanceOf(OrgAuthenticateError);
  });

  it('It should not be possible to authenticate with the wrong e-mail', async () => {
    await createOrg();

    expect(async() => 
      await sut.execute({email: 'org@exampletest.com',password: '123456'}))
    .rejects.toBeInstanceOf(OrgAuthenticateError);
  });
});