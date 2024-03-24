import { Module } from '@nestjs/common';
import { DatabaseModule } from './database';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DatabaseModule,
    HttpModule.register({
      timeout: 50000,
    }),
    DatabaseModule,
  ],
  exports: [DatabaseModule, HttpModule],
})
export class LibsModule {}
