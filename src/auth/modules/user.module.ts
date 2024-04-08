import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { PrismaUserRepository } from '../prisma/user.repository';
import { UserRepository } from '../user.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
