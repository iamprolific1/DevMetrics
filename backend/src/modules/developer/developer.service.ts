import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DeveloperService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.developer.findMany();
  }

  async findOne(githubId: number) {
    return this.prisma.developer.findUnique({
      where: { githubId },
    });
  }
}
