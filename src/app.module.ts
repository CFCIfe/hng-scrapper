import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nestjs-puppeteer';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PuppeteerModule.forRoot({ headless: 'new' }),
    PuppeteerModule.forFeature(['page1', 'page2']),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
