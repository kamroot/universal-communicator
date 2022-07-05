import { Test, TestingModule } from '@nestjs/testing';
import { MeetingspaceService } from './meetingspace.service';

describe('MeetingspaceService', () => {
  let service: MeetingspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingspaceService],
    }).compile();

    service = module.get<MeetingspaceService>(MeetingspaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
