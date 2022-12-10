
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';
async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Backend для сайта dimkless.ru')
    .setDescription('Документация REST API')
    .setVersion('1.0.1')
    .addTag('Dimkless')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  app.enableCors({
    credentials: true,
    origin: process.env.ORIGIN,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
start();
