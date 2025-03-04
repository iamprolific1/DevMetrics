import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on :', process.env.PORT);
}
bootstrap();
