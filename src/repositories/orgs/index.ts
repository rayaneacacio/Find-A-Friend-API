import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import type { OrgsRepositories } from './interface';

export class PrismaOrgsRepository implements OrgsRepositories {
  async create(data: Prisma.OrgCreateInput) {
    return await prisma.org.create({data});
  };

  async findByEmail(email: string) {
    return await prisma.org.findUnique({
      where: {
        email,
      },
    });
  };
};