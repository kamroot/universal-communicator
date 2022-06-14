import { Test, TestingModule } from '@nestjs/testing';
import { SignalwireController } from './signalwire.controller';

describe('SignalwireController', () => {
  let controller: SignalwireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignalwireController],
    }).compile();

    controller = module.get<SignalwireController>(SignalwireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
