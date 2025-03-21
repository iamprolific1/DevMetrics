import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    cors({
      origin: process.env.CLIENT_ORIGIN as string,
      credentials: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on :', process.env.PORT);
}
bootstrap();
