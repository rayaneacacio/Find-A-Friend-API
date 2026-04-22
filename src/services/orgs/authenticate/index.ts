import type { OrgsRepositories } from '@/repositories/orgs/interface';
import { compare } from 'bcryptjs';
import { OrgAuthenticateError } from '../errors';

interface RegisterRequest {
  email: string;
  password: string;
};

export class AuthenticateService {
  constructor(private orgsRepository: OrgsRepositories) {};

  async execute({email,password}: RegisterRequest) {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) throw new OrgAuthenticateError();

    const samePassword = await compare(password, org.passwordHash);

    if (!samePassword) throw new OrgAuthenticateError();

    return {org};
  };
};