import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddUserToGroupBody {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
