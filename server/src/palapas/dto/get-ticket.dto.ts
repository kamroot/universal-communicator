import { IsNotEmpty, IsString } from 'class-validator';

export class GetTicketDTO {
  @IsString()
  @IsNotEmpty()
  palapaName: string;

  @IsString()
  @IsNotEmpty()
  visitorName: string;
}
