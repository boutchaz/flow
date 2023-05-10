import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@nesty/common';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
