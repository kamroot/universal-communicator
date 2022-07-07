import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTicketDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  meetingspaceName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  visitorName: string;
}
