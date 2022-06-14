import { Test, TestingModule } from '@nestjs/testing';
import { SignalwireService } from './signalwire.service';

describe('SignalwireService', () => {
  let service: SignalwireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignalwireService],
    }).compile();

    service = module.get<SignalwireService>(SignalwireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
