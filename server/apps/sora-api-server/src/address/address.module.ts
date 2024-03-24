import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { LibsModule } from 'libs';

@Module({
  imports: [LibsModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
