import { CreateUserBody } from 'src/user/dto/create-user-body.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { User } from '../user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: CreateUserBody): Promise<void> {
    await this.prisma.user.create({ data: user });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
