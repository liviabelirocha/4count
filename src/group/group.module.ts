import { Module } from '@nestjs/common';
import { UserModule } from 'src/auth/modules/user.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { GroupController } from './group.controller';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';
import { PrismaGroupRepository } from './prisma/group.repository';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [
    GroupService,
    {
      provide: GroupRepository,
      useClass: PrismaGroupRepository,
    },
  ],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
