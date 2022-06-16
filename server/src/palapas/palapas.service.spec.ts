import { Test, TestingModule } from '@nestjs/testing';
import { PalapasService } from './palapas.service';

describe('PalapasService', () => {
  let service: PalapasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PalapasService],
    }).compile();

    service = module.get<PalapasService>(PalapasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
