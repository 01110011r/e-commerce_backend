import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllHttpExceptionFilter } from './http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('E-commerce')
  .setDescription('simple testable ')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  // app.setGlobalPrefix('api')

  const docs = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, docs);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllHttpExceptionFilter())
  await app.listen(configuration().port, () => console.log("server is running on port " + configuration().port));
}
bootstrap();
