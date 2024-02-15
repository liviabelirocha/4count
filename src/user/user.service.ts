import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserBody } from './dto/create-user-body.dto';
import { UserRepository } from './user.repository';
import { SignInBody } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async create({ password, ...rest }: CreateUserBody) {
    const encryptedPassword = await bcrypt.hash(password, 12);

    const user = await this.userRepository.create({
      password: encryptedPassword,
      ...rest,
    });

    return user;
  }

  async signIn({ email, password }: SignInBody) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) throw new Error('Not found');

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching)
      throw new UnauthorizedException('Invalid password');

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      name: user.name,
      email: user.email,
    });

    return { accessToken };
  }
}
