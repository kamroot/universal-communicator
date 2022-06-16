import { Test, TestingModule } from '@nestjs/testing';
import { PalapasController } from './palapas.controller';

describe('PalapasController', () => {
  let controller: PalapasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PalapasController],
    }).compile();

    controller = module.get<PalapasController>(PalapasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
