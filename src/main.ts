import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //application is instent created here

  const app = await NestFactory.create(AppModule);
  //register middlewave

  app.useGlobalPipes(new ValidationPipe());
  //application is started here
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
