/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  INestApplication,
  OnModuleInit,
  OnModuleDestroy,
  Injectable,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Enable connection pooling for postgreSQL
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL as string,
        },
      },
    });
  }

  // run when the module initializes (i.e., when the app starts)
  async onModuleInit() {
    await this.$connect();
  }

  // run when the module is destroyed (i.e., when the app stops)
  async onModuleDestroy() {
    await this.$disconnect();
  }

  // hook into NestJs shutdown lifecycle for better cleanup (i.e, if I explicitly close the application using ctrl ^ C, it should close the nest application to prevent memory leaks).
  // eslint-disable-next-line @typescript-eslint/require-await
  async enableShutdownHooks(app: INestApplication) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
