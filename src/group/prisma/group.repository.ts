import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { GroupRepository } from '../group.repository';

@Injectable()
export class PrismaGroupRepository implements GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(group: GroupRepository.CreateParams): Promise<void> {
    // await this.prisma.groupUser.create({
    // data: { userId: group.userId, group: { create: { name: group.name } } },
    // });
  }
}
