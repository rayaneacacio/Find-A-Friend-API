import { type Org, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import type { OrgsRepositories } from './interface';

export class InMemoryOrgsRepository implements OrgsRepositories {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      created_at: new Date(),
      address: data.address,
      phone: data.phone
    };

    this.items.push(org);

    return org;
  };

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) return null;

    return org;
  };
};