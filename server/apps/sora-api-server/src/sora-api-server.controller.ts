import { Controller, Get } from '@nestjs/common';
import { SoraApiServerService } from './sora-api-server.service';

@Controller()
export class SoraApiServerController {
  constructor(private readonly soraApiServerService: SoraApiServerService) {}

  @Get()
  getHello(): string {
    return this.soraApiServerService.getHello();
  }
}
