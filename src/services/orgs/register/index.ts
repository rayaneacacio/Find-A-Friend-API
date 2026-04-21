import type { OrgsRepositories } from '@/repositories/orgs/interface';
import { type Org } from '@prisma/client';
import { hash } from 'bcryptjs';
import { OrgAlreadyExistsError } from '../errors';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

interface RegisterResponse {
  org: Org;
};

export class RegisterService {
  constructor(private orgsRepository: OrgsRepositories) {}

  async execute({
    name,
    email,
    password,
    address,
    phone
  }: RegisterRequest): Promise<RegisterResponse> {
    const passwordHash = await hash(password, 6);

    const emailAlreadyExists = await this.orgsRepository.findByEmail(email);

    if (emailAlreadyExists) throw new OrgAlreadyExistsError();

    const org = await this.orgsRepository.create({
      name,
      email,
      passwordHash,
      address,
      phone
    });

    return {org};
  };
};