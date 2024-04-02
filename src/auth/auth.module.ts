import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/database/prisma.module';
import { jwtConstants } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaUserRepository } from './prisma/user.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    PrismaModule,
  ],
  providers: [
    AuthService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
