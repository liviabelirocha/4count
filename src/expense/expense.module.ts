import { Module } from '@nestjs/common';
import { UserService } from './expense.service';
import { UserController } from './expense.controller';
import { UserRepository } from './expense.repository';
import { PrismaUserRepository } from './prisma/expense.repository';
import { PrismaService } from 'src/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'segredo-lokao',
    }),
  ],
  providers: [
    PrismaService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
