import { Controller, Get, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(
    @Query('visitor_name') visitor_name: string,
    @Req() req: Request,
  ): Promise<any> {
    return this.appService.getHello(visitor_name, req);
  }
}
