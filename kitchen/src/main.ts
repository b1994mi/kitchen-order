import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions());
  await app.startAllMicroservices();
}
bootstrap();
