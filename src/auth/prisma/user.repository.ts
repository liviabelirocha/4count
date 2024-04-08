import { Injectable } from '@nestjs/common';
import { SignUpBody } from 'src/auth/dto/sign-up.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '../auth.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: SignUpBody): Promise<void> {
    await this.prisma.user.create({ data: user });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
