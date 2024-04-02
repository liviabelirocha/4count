import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { GroupController } from './group.controller';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';
import { PrismaGroupRepository } from './prisma/group.repository';

@Module({
  providers: [
    GroupService,
    {
      provide: GroupRepository,
      useClass: PrismaGroupRepository,
    },
  ],
  controllers: [GroupController],
  exports: [GroupService],
  imports: [PrismaModule],
})
export class GroupModule {}
