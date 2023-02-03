import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';
import { rateLimit } from 'express-rate-limit';
import { config } from 'process';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1');

  app.enableCors({ origin: '*', credentials: true });
  // app.use(rateLimit(config.rateLimit));
  app.useGlobalFilters(new AllExceptionsFilter());

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Mvate')
      .setDescription('A voting platform for all')
      .build(),
  );

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
