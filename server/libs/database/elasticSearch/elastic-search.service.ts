import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ElasticSearchService {
  private esClient: Client;
  constructor() {
    // TODO logger service & config service
    console.log('DatabaseService constructor');
  }

  async init() {
    const options = {
      node: 'http://localhost:9200',
      auth: {
        username: 'sora',
        password: 'sora',
      },
    };

    this.esClient = new Client(options);

    // call ping after connection
    await this.esClient.ping();
  }
}
