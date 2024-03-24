import { Module } from '@nestjs/common';
import { ElasticSearchModule } from './elasticSearch';

@Module({
  imports: [ElasticSearchModule],
  exports: [ElasticSearchModule],
})
export class DatabaseModule {}
