import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';

import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
