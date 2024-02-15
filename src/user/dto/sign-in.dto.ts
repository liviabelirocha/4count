import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignInBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
