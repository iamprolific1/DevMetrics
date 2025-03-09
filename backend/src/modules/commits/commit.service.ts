import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CommitService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.commit.findMany();
  }

  async findByDeveloper(githubId: number) {
    return this.prisma.commit.findMany({
      where: { developerId: githubId },
    });
  }
}
