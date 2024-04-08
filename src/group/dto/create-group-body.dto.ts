import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGroupBody {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
