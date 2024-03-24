import { Test, TestingModule } from '@nestjs/testing';
import { SoraApiServerController } from './sora-api-server.controller';
import { SoraApiServerService } from './sora-api-server.service';

describe('SoraApiServerController', () => {
  let soraApiServerController: SoraApiServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SoraApiServerController],
      providers: [SoraApiServerService],
    }).compile();

    soraApiServerController = app.get<SoraApiServerController>(SoraApiServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(soraApiServerController.getHello()).toBe('Hello World!');
    });
  });
});
