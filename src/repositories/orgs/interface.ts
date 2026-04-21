import { Prisma, type Org } from '@prisma/client';

export interface OrgsRepositories {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findByEmail(email: string): Promise<Org | null>;
};