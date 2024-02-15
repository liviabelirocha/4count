import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserBody } from './dto/create-user-body.dto';
import { UserService } from './user.service';
import { SignInBody } from './dto/sign-in.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    return await this.userService.create(body);
  }

  @Post('signIn')
  async signIn(@Body() body: SignInBody) {
    return await this.userService.signIn(body);
  }
}
