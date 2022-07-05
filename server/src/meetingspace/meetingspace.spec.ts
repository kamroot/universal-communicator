import { Test, TestingModule } from '@nestjs/testing';
import { MeetingspaceController } from './meetingspace.controller';

describe('PalapasController', () => {
  let controller: MeetingspaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeetingspaceController],
    }).compile();

    controller = module.get<MeetingspaceController>(MeetingspaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
