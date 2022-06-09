import { Test, TestingModule } from '@nestjs/testing';
import { PubsubGateway } from './pubsub.gateway';

describe('PubssubGateway', () => {
  let gateway: PubsubGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PubsubGateway],
    }).compile();

    gateway = module.get<PubsubGateway>(PubsubGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
