import { IsNotEmpty } from 'class-validator';

export class AddUserToGroupBody {
  @IsNotEmpty()
  name: string;
}
