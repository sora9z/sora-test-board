import { Module } from '@nestjs/common';
import { SoraApiServerController } from './sora-api-server.controller';
import { SoraApiServerService } from './sora-api-server.service';
import { AddressModule } from './address/address.module';
import { LibsModule } from 'libs';

@Module({
  imports: [AddressModule, LibsModule],
  controllers: [SoraApiServerController],
  providers: [SoraApiServerService],
})
export class SoraApiServerModule {}
