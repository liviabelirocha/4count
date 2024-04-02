import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Group } from '../group.entity';
import { GroupRepository } from '../group.repository';

@Injectable()
export class PrismaGroupRepository implements GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(group: GroupRepository.CreateParams): Promise<void> {
    await this.prisma.group.create({
      data: {
        name: group.name,
        users: {
          create: [
            {
              userId: group.userId,
            },
          ],
        },
      },
    });
  }

  async addUser(params: GroupRepository.AddUserParams): Promise<void> {
    await this.prisma.groupUser.create({
      data: params,
    });
  }

  async isUserInGroup({
    groupId,
    userId,
  }: GroupRepository.FindByIdAndUser): Promise<boolean> {
    const group = await this.prisma.groupUser.findFirst({
      where: {
        groupId,
        userId,
      },
    });

    return !!group;
  }

  async list(userId: string): Promise<Group[]> {
    return this.prisma.group.findMany({
      where: {
        users: { some: { userId } },
      },
    });
  }
}
