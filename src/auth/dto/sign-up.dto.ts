import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
