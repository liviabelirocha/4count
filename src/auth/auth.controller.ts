import { Body, Controller, Post } from '@nestjs/common';
import { Public } from './auth.factories';
import { AuthService } from './auth.service';
import { SignInBody } from './dto/sign-in.dto';
import { SignUpBody } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Public()
  @Post('signUp')
  async createAuth(@Body() body: SignUpBody) {
    return await this.userService.signUp(body);
  }

  @Public()
  @Post('signIn')
  async signIn(@Body() body: SignInBody) {
    return await this.userService.signIn(body);
  }
}
