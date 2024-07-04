import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('e-commerce')
  .setDescription('simple testable ')
  .setVersion('1.0')
  .addTag('tag')
  .addBearerAuth()
  .build();

  // app.setGlobalPrefix('api')

  const docs = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, docs);

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(configuration().port, () => console.log("server is running on port " + configuration().port));
}
bootstrap();
