import { NestFactory } from '@nestjs/core';
import { SoraApiServerModule } from './sora-api-server.module';

async function bootstrap() {
  const app = await NestFactory.create(SoraApiServerModule);
  await app.listen(3000);
}
bootstrap();
