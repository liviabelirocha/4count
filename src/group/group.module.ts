import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GroupController } from './group.controller';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';
import { PrismaGroupRepository } from './prisma/group.repository';

@Module({
  providers: [
    PrismaService,
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
