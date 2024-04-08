import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/auth.entity';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Group, GroupUser } from '../group.entity';
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
              name: '',
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

  async findUserInGroup({
    groupId,
    userId,
  }: GroupRepository.FindByIdAndUser): Promise<{ group: Group; user: User }> {
    const group = await this.prisma.groupUser.findFirst({
      where: {
        groupId,
        userId,
      },
      include: {
        user: true,
        group: true,
      },
    });

    return group;
  }

  async list(userId: string): Promise<Group[]> {
    return this.prisma.group.findMany({
      where: {
        users: { some: { userId } },
      },
    });
  }

  async update({ id, userId }: { id: string; userId: string }): Promise<void> {
    await this.prisma.groupUser.update({
      data: {
        userId,
      },
      where: {
        id,
      },
    });
  }

  async listUnbountUsers(groupId: string): Promise<GroupUser[]> {
    return this.prisma.groupUser.findMany({
      where: {
        groupId,
        userId: null,
      },
    });
  }
}
