import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AppModule } from './app.module';

const dotenv_path = path.resolve(process.cwd(), '.env');
dotenv.config({ path: dotenv_path });

const port = process.env.PORT || 9000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
