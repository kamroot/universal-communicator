import { IsNotEmpty, IsString } from 'class-validator';

export class GetTicketDTO {
  @IsString()
  @IsNotEmpty()
  meetingspaceName: string;

  @IsString()
  @IsNotEmpty()
  visitorName: string;
}
