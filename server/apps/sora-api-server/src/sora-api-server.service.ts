import { Injectable } from '@nestjs/common';

@Injectable()
export class SoraApiServerService {
  getHello(): string {
    return 'Hello World!';
  }
}
